If the server responds anything other than 200, the response is not successful due to either being a:

- Bad request (400)
- Unauthorized (401)
- Gateway errors (5xx)

These are non-ideal scenarios where the original response couldn't be delivered via 200 (despite there is a possibility of a request containing an error). This non-standard response needs to be checked with the server for underlying issue like network errors etc.

- 4xx Errors
    - **Unauthorized Access (401)**
        - Verify authentication tokens.
        - Check user permissions in Hasura.
    - **Forbidden (403)**
        - Check role-based access control settings.
        - Ensure the user has the correct permissions for the requested operation.
        - Check the token passed
    - **Not Found (404)**
        - Verify the endpoint URL.
        - Ensure the requested resource exists in the database.
- 5xx Errors
    - **Internal Server Error (500)**
        - Check Hasura logs for detailed error messages.
        - Verify database connectivity.
    - **Service Unavailable (503)**
        - Check the status of the Hasura service.
        - Ensure the server is not overloaded.