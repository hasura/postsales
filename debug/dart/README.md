# What
This script could be deployed as the k8s job to the kubernetes cluster
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
3. Change the postgres-k8s-check-job.yaml file to update the image, service account etc
4. if necessary, change the secret variable referenced for connection string
5. Deploy postgres-k8s-check-job.yaml to kubernetes cluster and check the logs

Make necessary customisation to the script as per the requirement to debug. This script could be helpful where we have limited access to the kubernetes cluster. i.e. - the `kubectl exec` is not allowed but we want to use telnet, psql, curl to check the connecitivity
