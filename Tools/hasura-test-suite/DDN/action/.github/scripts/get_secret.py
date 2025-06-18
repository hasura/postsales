import json
import os

def main():
    secrets = json.loads(os.getenv('HGE'))
    graphql_endpoint = os.getenv('GRAPHQL_ENDPOINT')
    HASURA_CLOUD_PAT = secrets.get(graphql_endpoint, '')

    print(f"::set-output name=HASURA_CLOUD_PAT::{HASURA_CLOUD_PAT}")

if __name__ == "__main__":
    main()
