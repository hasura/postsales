GraphQL is strongly typed and it performs validation of all queries before executing them. It can reject a query if it is invalid based on a set of rules.

The validation rules could again be split into

- malformed query
- syntax or schema logic
- variables and fragments not defined properly.
  
  
Read the source code for [validation rules](https://github.com/graphql/graphql-js/tree/main/src/validation) in graphql-js server to understand various query validation that goes through before executing the query.