# handler.py
import os
import json
from dotenv import load_dotenv
from utils.cognitoGQLClient import CognitoGraphQLClient

load_dotenv()

def init_client_from_env():
    """Initialize the GraphQL client using environment variables"""


    required_vars = ['AWS_COGNITO_DOMAIN', 'AWS_COGNITO_APP_CLIENT_ID', 'AWS_COGNITO_APP_CLIENT_SECRET', 'GRAPHQL_ENDPOINT']

    # Check if all required variables are set
    missing = [var for var in required_vars if not os.environ.get(var)]
    if missing:
        raise EnvironmentError(f"Missing required environment variables: {', '.join(missing)}")

    return CognitoGraphQLClient(
        cognito_domain=os.environ['AWS_COGNITO_DOMAIN'],
        client_id=os.environ['AWS_COGNITO_APP_CLIENT_ID'],
        client_secret=os.environ['AWS_COGNITO_APP_CLIENT_SECRET'],
        graphql_endpoint=os.environ['GRAPHQL_ENDPOINT']
    )

client = init_client_from_env()

def get_data():
    # Create an instance of CognitoGraphQLClient
    

    query = """
    query MyQuery {
        order(limit: 2) {
            customerId
            discountPrice
        }
    }
    """
    
    try:
        result = client.execute_query(query)
        print("Query result:", json.dumps(result, indent=2))
        return {"data": result}

    except Exception as e:
        # Handle any exception that occurs
        return {"error": f"Failed to fetch data: {str(e)}"}