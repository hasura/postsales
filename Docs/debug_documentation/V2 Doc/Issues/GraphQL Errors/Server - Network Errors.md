All the errors above come under the category of GraphQL errors with a response status code of `200`. When there is a network error while trying to contact a GraphQL server, due to either the server being down or timeouts etc, then the response will be a status code of 4xx or 5xx.

If the server responds anything other than 200, the response is not successful due to either being a:

- Bad request (400)
- Unauthorized (401)
- Gateway errors (5xx)

These are non-ideal scenarios where the original response couldn't be delivered via 200 (despite there is a possibility of a request containing an error). This non-standard response needs to be checked with the server for underlying issue like network errors etc.