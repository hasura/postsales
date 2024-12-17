# What
This script could be deployed as the deployment to the kubernetes cluster
The script checks the connectivity to postgres and service

For postgres, it checks below
 - if the service/postgres host and port is reachable.
 - if the postgres username password is correct by connecting to postgres

For service, it checks below
 - if the is reachable with service name and port 8080
 - if the /heathz returns 200 for API service


# How
1. Build the docker image
2. Push the image to registry which is reachable within k8s cluster
3. Change the deployment.yaml file to update the image
4. if necessary, change the secret variable referenced for connection string
5. Deploy deployment.yaml to kubernetes cluster
