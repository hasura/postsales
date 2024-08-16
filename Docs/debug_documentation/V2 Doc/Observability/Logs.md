The Hasura GraphQL Engine has different kind of log-types depending on the sub-system or the layer. A log-type is simply the `type` field in a log line, which indicates which sub-system the log comes from.

For example, the HTTP webserver logs incoming requests as an access log and is called `http-log`. Similarly logs from the websocket layer are called `websocket-log`, logs from the Event Trigger system are called `event-trigger` etc.

You can configure the GraphQL Engine to enable/disable certain log-types using the `--enabled-log-types` flag or the`HASURA_GRAPHQL_ENABLED_LOG_TYPES` env var. See [GraphQL Engine server config reference](https://hasura.io/docs/latest/deployment/graphql-engine-flags/reference/#log-level)

The default enabled **Community Edition** log-types are: `startup, http-log, webhook-log, websocket-log, jwk-refresh-log`

The default enabled **Enterprise Edition** log-types are: `api-limit-log`