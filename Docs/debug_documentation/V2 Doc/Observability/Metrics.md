Hasura exports three types of prometheus metrics:

- Histogram: Represents the distribution of a set of values across a set of buckets. Please note that the histogram buckets are [cumulative](https://en.wikipedia.org/wiki/Histogram#Cumulative_histogram). You can read more about the histogram metric type [here](https://prometheus.io/docs/concepts/metric_types/#histogram). For example`hasura_event_webhook_processing_time_seconds` is a histogram metric.
- Counter: Represents a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart. You can read more about the counter metric type [here](https://prometheus.io/docs/concepts/metric_types/#counter). For example `hasura_graphql_requests_total` is a counter metric.
- Gauge: Represents a single numerical value that can arbitrarily go up and down. You can read more about the gauge metric type [here](https://prometheus.io/docs/concepts/metric_types/#gauge). For example `hasura_active_subscriptions` is a gauge metric.