Error handling in GraphQL is different on both server and client side tooling.
When the response contains the `errors` object along with the `data` object, it could mean a partially correct response for the request. Digging into the errors object will give a better idea into what part of the query went wrong.

The default errors JSON includes `message`, `locations` and `path`. According to the working draft of the spec, it is also possible to send custom data in the `extensions` key.

