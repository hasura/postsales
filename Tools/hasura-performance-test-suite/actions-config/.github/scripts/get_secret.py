import json
import os

def main():
    secrets = json.loads(os.getenv('HGE'))
    graphql_endpoint = os.getenv('GRAPHQL_ENDPOINT')
    hasura_admin_secret = secrets.get(graphql_endpoint, '')

    print(f"::set-output name=hasura_admin_secret::{hasura_admin_secret}")

if __name__ == "__main__":
    main()
