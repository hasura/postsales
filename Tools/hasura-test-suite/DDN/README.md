# Hasura Test Suite (HTS): DDN Documentation

## Table of contents

- [Hasura Test Suite (HTS): DDN Documentation](#hasura-test-suite-hts-ddn-documentation)
  - [About HTS](#about-hts)
  - [Components](#components)
    - [Artillery Framework](#artillery-framework)
    - [Prometheus Pushgateway](#prometheus-pushgateway)
    - [Grafana](#grafana)
  - [Modes of Deployment](#modes-of-deployment)
  - [Executing Tests](#executing-tests)
    - [Load Testing](#load-testing)
    - [Functional Testing](#functional-testing)
  - [Local Execution Without Configuration:](#local-execution-without-configuration)



## About HTS

Hasura Test Suite (HTS) is an open source tool built around the Artillery open source framework. Being able to use this tool as your single source to perform both functional validations and performance testing of any Hasura deployment. HTS supports both self-hosted and Hasura cloud deployments of Hasura. 


## Components

### Artillery Framework
Artillery is designed for testing backend systems, such as API services, ecommerce backends, chat systems, game backends, databases, message brokers and queues, and anything else that can be communicated with over a network.

With Artillery, you can create test scripts that can test common workflows for GraphQL to smoke out any potential performance issues that can creep up when you least expect. Running regular load tests on your APIs both during development and against your production servers will keep your APIs performant and resilient for your customers. This article shows you how to use Artillery to keep your GraphQL services in check. Learn more at [Artillery Website](https://www.artillery.io/docs)


```sh
  npm i artillery@2.0.22
```


### Prometheus Pushgateway

The Prometheus Pushgateway exists to allow ephemeral and batch jobs to expose their metrics to Prometheus. 
Since these kinds of jobs may not exist long enough to be scraped, they can instead push their metrics to a Pushgateway. The Pushgateway then exposes these metrics to Prometheus. 

In our specific example, we use the Pushgateway to export the Artillery Test metrics to the Prometheus instance deployed as part of HTS (or to your existing Prometheus environment) and use these metrics to create charts. Learn more at [Prometheus Pushgateway Github](https://github.com/prometheus/pushgateway)

You can deploy the Pushgateway using the prom/pushgateway Docker image.


```sh
  docker pull prom/pushgateway
  
  docker run -d -p 9091:9091 prom/pushgateway
```

### Grafana

Grafana is a multi-platform open source analytics and interactive visualization web application. It can produce charts, graphs, and alerts for the web when connected to supported data sources. Learn more at [Grafana Docs](https://grafana.com/docs/grafana/latest/)


## Modes of Deployment
- Github Action
- Local Execution Without Configuration: Run the tests using artillery cli.

### As a Github Action

- Clone the Repository and Push to Your Own Repository

  ``` https://github.com/hasura/postsales/tree/main/Tools/hasura-performance-test-suite/actions-config ```

- The workflow file is located under /hasura-test-suite/DDN/action/.github/workflows

- Configure the secrets as github secrets

- You can run the test by passing the input parameteres.


  ```Note: You can modify the configuration to accept other headers ( if any ) and It is adivisable to use custom runner for your tests ```




## Executing Tests

> Note: for running load or functional tests, the auth parameters need to be properly specified. The configs in this directory assume a publicly accessible GraphQL API with a JWT token passed as a custom `Auth-token` header. You will need to modify the `artilleryTest.yaml` and `functionalTest.yaml` headers, as well as the `.env` variables depending on your auth config. If the API expects a Bearer token, replace the `Auth-token` header with `Authorization` and pass as a Bearer token. If the API endpoint is private, set the `X-Hasura-DDN-Token` header.

### Load Testing

1. Clone Repository: Clone this repository to your local machine.

    ```sh
    git clone https://github.com/hasura/postsales.git
    ```
2. Install NPM packages in ddn-cli directory
   ```sh
   npm install
   ```
3. Install artillery
   ```sh
   npm install -g artillery@2.0.14
   ```

4. Generate the GraphQL API Schema
    ```sh
   npm run codegen
   ```

5. Add all the .graphql files in the `queries` folder, following the syntax/example

    ```
    query Cart {
      cartItems(limit: 10) {
        cartId
        createdAt
        id
        productId
        quantity
      }
    }
    query GetCarts {
      carts(limit: 10) {
        id
        isComplete
        isReminderSent
        updatedAt
        userId
      }
    }
    query GetCoupons {
      coupons(limit: 10) {
        amount
        code
        createdAt
        expirationDate
        id
      }
    }
        
    ```


    Note: Queries of only one file will be tested.

6. Update the env variables, each explained below
  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  - `X_HASURA_DDN_TOKEN`:  Value of x-hasura-ddn-token
  - `AUTH_TOKEN`: Value of authentication token
  - `TEST_DURATION`: Test duration in seconds (or Xh to set in hours)
  - `STARTING_ARRIVAL_RATE`: Starting calls per second value.
  - `ENDING_ARRIVAL_RATE`: At the end of your test duration, this will be your calls per second.
  - `MAXIMUM_VIRTUAL_USER`: Maximum number of virtual users
  - `TEST_NAME`:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)
  - `PUSHGATEWAY`: This is a component that pushes metrics to Prometheus. Enter the IP Address
  - `QUERY_FILE`: .graphql file name, as modified in graphQL/queries directory

7. Run the test
   ```sh
   artillery run artilleryTest.yml --dotenv=.env
   ```
8. Checkout the metrics & dashboards on Grafana


### Functional Testing


1. Clone Repository: Clone this repository to your local machine.
   ```sh
   git clone https://github.com/hasura/postsales.git
   ```

2. Install artillery
   ```sh
   npm install -g artillery@2.0.14
   ```

3. Add the functional test scenarios file in the `functionalTest` folder, following the syntax/example

   ```
      config:
    scenarios:
      - name: Null Scenario
        flow:
          - post:
              url: "/"
              json:
                query: | 
                  query testQuery($userid: Int!) {
                    playing_with_neon(where: {id: {_eq: $userid}}) {
                      name
                      id
                    }
                  }
                
                variables:
                  userid:1
              expect:
                - statusCode:200
      - loop:
        - post:
            url: '/'
            json:
              query: |
                mutation MyMutation($name: String!) {
                    insert_playing_with_neon(objects: {name: $name}) {
                      returning {
                        id
                        name
                      }
                    }
                  }
              variables:
                name: '{{ $randomString() }}'
            capture:
                    - json: '$.data.insert_playing_with_neon.returning[0].id'
                      as: id
        count: 100
    
      - name: Delete data
        flow:
          - post:
              url: '/'
              json:
                query: |
                 mutation deleteData($id: Int!) {
                    delete_playing_with_neon(where: {id: {_eq: $id}}) {
                      affected_rows
                    }
                  }
                variables:
                  id: '{{ id }}'
    
      ```

4. Update the env variables, each explained below
  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  - `X_HASURA_DDN_TOKEN`:  Value of x-hasura-ddn-token
  - `AUTH_TOKEN`: Value of authentication token
  - `TEST_DURATION`: Test duration in seconds (or Xh to set in hours)
  - `STARTING_ARRIVAL_RATE`: Starting calls per second value.
  - `ENDING_ARRIVAL_RATE`: At the end of your test duration, this will be your calls per second.
  - `MAXIMUM_VIRTUAL_USER`: Maximum number of virtual users
  - `TEST_NAME`:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)
  - `PUSHGATEWAY`: This is a component that pushes metrics to Prometheus. Enter the IP Address


5. Run the test
```sh
  artillery run --config funtionalTest.yaml <file_name.yaml> --dotenv=.env
```
`example: artillery run --config funtionalTest.yaml functionalTest/validations.yaml --dotenv=.env`


6. Checkout the metrics & dashboards on Grafana




## Local Execution Without Configuration:

 1. Install Artillery: ```npm install -g artillery@2.0.14```
  2. Create a test.yaml file with your test configurations.

```
config:
  target: <GRAPHQL_ENDPOINT>
  defaults:
      headers:
        x-hasura-ddn-token: ${DDN_TOKEN}
        Auth-Token: ${AuthTOKEN}
        # add additional header (if any)
  phases:
    - duration: 60
      arrivalRate: 1
      rampTo: 1
      name: Warm up phase
    - duration: 60
      arrivalRate: 5
      rampTo: 10
      name: Ramp up load
    - duration: 30

  plugins:
    metrics-by-endpoint:
      useOnlyRequestNames: true
      metricsNamespace: operation

  publish-metrics:
  - type: prometheus
    pushgateway: "http://143.198.129.138:9091"
    tags:
      - "testId: testName"
      - "type:loadtest"
    ssl: false

  expect: 
  reportFailuresAsErrors: true
  outputFormat: json

scenarios:

  - name: 'Create and fetch messages flow'
    flow:
      - post:
          url: '/'
          json:
            query: |
                query GetEmployee {
                  Employee(limit: 10) {
                    Country
                    BirthDate
                    City
                    Address
                    EmployeeId
                    Fax
                    FirstName
                  }
                }


  - name: 'Passing null value for non-nullable type with default value'
    flow:
      - post:
          url: "/"
          json:
            query: |
              query Album($limit: Int! = 1) {
                  Album(limit: $limit) {
                    AlbumId
                    Title
                  }
                }
            variables:
              limit: null
          capture:
            json: '$.errors[0].message'
            as: 'passing_null_non_nullable_default_error'
      - match:
          statusCode: 200
          json:
            errors:
              - extensions:
                  code: validation-failed
                  path: "$"
                message: 'null value found for non-nullable type: "Int!"'

```

  3. Run the test: 

  ```sh
  artillery run test.yaml
  ```
