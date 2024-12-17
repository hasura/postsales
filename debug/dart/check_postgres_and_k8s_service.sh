#!/bin/bash

# Check if ENV variable for PostgreSQL is set
if [ -z "$POSTGRES_CONNECTION_STRING" ]; then
  echo "Error: POSTGRES_CONNECTION_STRING environment variable is not set."
  exit 1
fi

# Check if SERVICE_HOST is set
if [ -z "$SERVICE_HOST" ]; then
  echo "Error: SERVICE_HOST environment variable is not set."
  exit 1
fi

# Extract host, port, database, user from the PostgreSQL connection string
CONN_STRING="$POSTGRES_CONNECTION_STRING"
PG_HOST=$(echo $CONN_STRING | awk -F[@:] '{print $2}')
PG_PORT=$(echo $CONN_STRING | awk -F[@:] '{print $3}')
DB_NAME=$(echo $CONN_STRING | awk -F[/:] '{print $4}')
USER=$(echo $CONN_STRING | awk -F[/:@] '{print $2}')

# Check connectivity to PostgreSQL using telnet
echo "Checking connectivity to PostgreSQL at ${PG_HOST}:${PG_PORT}..."
if ! echo exit | telnet $PG_HOST $PG_PORT; then
  echo "Error: Unable to connect to PostgreSQL at ${PG_HOST}:${PG_PORT}."
  exit 2
else
  echo "Successfully connected to PostgreSQL at ${PG_HOST}:${PG_PORT}."
fi

# Connect to PostgreSQL using psql
echo "Connecting to PostgreSQL database '$DB_NAME' as user '$USER'..."
psql "$POSTGRES_CONNECTION_STRING" -c "SELECT 1;"

# Set the variables for the Kubernetes service from the environment variable
SERVICE_PORT=8080
HEALTHZ_ENDPOINT="/healthz"

# Check connectivity to Kubernetes service using telnet
echo "Checking connectivity to Kubernetes service at ${SERVICE_HOST}:${SERVICE_PORT}..."
if ! echo exit | telnet $SERVICE_HOST $SERVICE_PORT; then
  echo "Error: Unable to connect to Kubernetes service at ${SERVICE_HOST}:${SERVICE_PORT}."
  exit 3
else
  echo "Successfully connected to Kubernetes service at ${SERVICE_HOST}:${SERVICE_PORT}."
fi

# Check health status using curl
echo "Checking health status at ${SERVICE_HOST}:${SERVICE_PORT}${HEALTHZ_ENDPOINT}..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVICE_HOST:$SERVICE_PORT$HEALTHZ_ENDPOINT)

if [ "$HEALTH_STATUS" -eq 200 ]; then
  echo "Health check passed: Service is healthy."
else
  echo "Health check failed: Received HTTP status code $HEALTH_STATUS."
  exit 4
fi

echo "All checks completed successfully."

