# Use an appropriate base image with bash and required tools installed.
FROM ubuntu:latest

# Install necessary packages (telnet, curl, and PostgreSQL client)
RUN apt-get update && apt-get install -y \
    telnet \
    curl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set build arguments for service host
ARG SERVICE_HOST
# Set environment variable for service host
ENV SERVICE_HOST=${SERVICE_HOST}

# Copy the shell script into the container
COPY check_postgres_and_k8s_service.sh /usr/local/bin/check_postgres_and_k8s_service.sh

# Make the script executable
RUN chmod +x /usr/local/bin/check_postgres_and_k8s_service.sh

# Set the entrypoint for the container to run the shell script
ENTRYPOINT ["/usr/local/bin/check_postgres_and_k8s_service.sh"]

