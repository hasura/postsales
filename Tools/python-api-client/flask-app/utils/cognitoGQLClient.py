import requests
import json
import threading
import time
from datetime import datetime, timedelta
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('cognito-graphql-client')

class CognitoGraphQLClient:
    def __init__(self, cognito_domain, client_id, client_secret, graphql_endpoint, scope=""):
        """
        Initialize the CognitoGraphQLClient with required configuration.
        
        Args:
            cognito_domain (str): The domain of your Cognito service
            client_id (str): The client ID for your M2M app client
            client_secret (str): The client secret for your M2M app client
            graphql_endpoint (str): The GraphQL API endpoint URL
            scope (str, optional): The OAuth scope to request
        """
        self.cognito_domain = cognito_domain
        self.client_id = client_id
        self.client_secret = client_secret
        self.graphql_endpoint = graphql_endpoint
        self.scope = scope
        
        # Token management
        self.access_token = None
        self.token_expiry = None
        self.refresh_interval = 55  # Refresh 5 seconds before expiry
        self.token_thread = None
        self._stop_token_refresh = threading.Event()
        
        # Initialize token
        self.get_token()
        
        # Start token refresh thread
        self.start_token_refresh()
    
    def get_token(self):
        """
        Fetch a new token from AWS Cognito using client credentials flow.
        """
        token_url = f"{self.cognito_domain}/oauth2/token"
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        payload = {
            'grant_type': 'client_credentials',
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        
        if self.scope:
            payload['scope'] = self.scope
        
        try:
            response = requests.post(token_url, headers=headers, data=payload)
            response.raise_for_status()
            
            token_data = response.json()
            # print('token_data',token_data)
            self.access_token = token_data['access_token']
            
            # Calculate token expiry time (default is 1 minute = 60 seconds)
            expires_in = token_data.get('expires_in', 60)
            print('expires_in',expires_in)
            self.token_expiry = datetime.now() + timedelta(seconds=expires_in)
            
            logger.info(f"Token refreshed successfully. Expires in {expires_in} seconds.")
            return self.access_token
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching token: {str(e)}")
            if response and hasattr(response, 'text'):
                logger.error(f"Response: {response.text}")
            raise
    
    def _token_refresh_worker(self):
        """
        Background worker that refreshes the token periodically.
        """
        while not self._stop_token_refresh.is_set():
            # Check if token needs refresh (if it's expired or about to expire)
            if self.token_expiry and datetime.now() > (self.token_expiry - timedelta(seconds=5)):
                try:
                    self.get_token()
                except Exception as e:
                    logger.error(f"Failed to refresh token in background thread: {str(e)}")
            
            # Sleep for a short period before checking again
            time.sleep(1)
    
    def start_token_refresh(self):
        """
        Start the token refresh background thread.
        """
        if self.token_thread is None or not self.token_thread.is_alive():
            self._stop_token_refresh.clear()
            self.token_thread = threading.Thread(target=self._token_refresh_worker)
            self.token_thread.daemon = True
            self.token_thread.start()
            logger.info("Token refresh thread started")
    
    def stop_token_refresh(self):
        """
        Stop the token refresh background thread.
        """
        if self.token_thread and self.token_thread.is_alive():
            self._stop_token_refresh.set()
            self.token_thread.join(timeout=2)
            logger.info("Token refresh thread stopped")
    
    def execute_query(self, query, variables=None):
        """
        Execute a GraphQL query or mutation.
        
        Args:
            query (str): The GraphQL query or mutation
            variables (dict, optional): Variables for the GraphQL operation
            
        Returns:
            dict: The response from the GraphQL API
        """
        # print('Access token before check' , self.access_token)
        
        if not self.access_token:
            self.get_token()
        
        # print('Access token after check',self.access_token)
        
        headers = {
            'Content-Type': 'application/json',
            'Auth-Token': f'{self.access_token}',
        }
        
        payload = {
            'query': query
        }
        
        if variables:
            payload['variables'] = variables
        
        try:
            response = requests.post(
                self.graphql_endpoint,
                headers=headers,
                data=json.dumps(payload)
            )
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"GraphQL request error: {str(e)}")
            # Check if it's an auth error, might need to refresh token
            if response.status_code == 401:
                logger.info("Unauthorized error, refreshing token and retrying...")
                self.get_token()
                # Retry once with new token
                return self.execute_query(query, variables)
            if response and hasattr(response, 'text'):
                logger.error(f"Response: {response.text}")
            raise
    
    def __del__(self):
        """
        Clean up resources when the object is garbage collected.
        """
        self.stop_token_refresh()
