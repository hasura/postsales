### Usage

This python API client requires certain third-party packages in order to work such as `requests`.

You can either

- install that package globally.
- use a virtual environment, install necessary packages and run python project .

```
python3 -m venv "path-to-your-venv-file"
source path-to-your-venv-file/bin/activate
pip install -r requirements.txt
```

**API client inputs**
It requires certain inputs in python file to be supplied via env or hardcoded

- Cognito User Pool App Client ID
- Cognito User Pool App Client Secret
- Cognito User Pool Domain URL
- GraphQL Endpoint
- x-hasura-ddn-token (Note: Use this if your API mode is "private" and it can be acquired from console)

Please create a .env file from `.envexample`.

If your API mode is "Public", then do couple of modifications

- remove `x-hasura-ddn-token` header from API client request
- remove X_HASURA_DDN_TOKEN from .env file
