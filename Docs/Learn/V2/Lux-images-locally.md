
To pull Lux images locally using the service_account credentials provided 

## 1. Authenticate with the Docker Registry:

First, authenticate your local Docker CLI with the Google Container Registry (GCR) using the service account JSON key.

```sh 
cat service_account.json | docker login -u _json_key --password-stdin https://gcr.io
```

- `cat service_account.json`: Reads the content of the service account JSON key file.
- `docker login -u _json_key --password-stdin https://gcr.io`: Logs into GCR using the JSON key as the password.

## 2. Pull the Docker Images:
After logging in, you can pull any Docker image from the Google Container Registry. Replace <image-name> and <tag>with the appropriate values.

```sh
docker pull gcr.io/<project-id>/<image-name>:<tag>

```

Example:

```sh
docker pull gcr.io/hasura-ee/lux-api:2.0.10
```

