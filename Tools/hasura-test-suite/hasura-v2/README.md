# Hasura Test Suite (HTS) Documentation


## 1. About HTS

Hasura Test Suite (HTS) is an open source tool built around the Artillery open source framework. We have optimized this to work better with Hasura V2, being able to use this tool as your single source to perform both functional validations and performance testing of any Hasura deployment. HTS supports both self-hosted and Hasura cloud deployments of Hasura. DDN support is coming next week.

### 1.1. Overview


### 1.2. Components

#### 1.2.1. Artillery Framework
Artillery is designed for testing backend systems, such as API services, ecommerce backends, chat systems, game backends, databases, message brokers and queues, and anything else that can be communicated with over a network.

With Artillery, you can create test scripts that can test common workflows for GraphQL to smoke out any potential performance issues that can creep up when you least expect. Running regular load tests on your APIs both during development and against your production servers will keep your APIs performant and resilient for your customers. This article shows you how to use Artillery to keep your GraphQL services in check. Learn more at [Artillery Website](https://www.artillery.io/docs)

#### 1.2.2. Prometheus Pushgateway
The Prometheus Pushgateway exists to allow ephemeral and batch jobs to expose their metrics to Prometheus. Since these kinds of jobs may not exist long enough to be scraped, they can instead push their metrics to a Pushgateway. The Pushgateway then exposes these metrics to Prometheus. In our specific example, we use the Pushgateway to export the Artillery Test metrics to the Prometheus instance deployed as part of HTS (or to your existing Prometheus environment) and use these metrics to create charts. Learn more at [Prometheus Pushgateway Github](https://github.com/prometheus/pushgateway)

You can deploy the Pushgateway using the prom/pushgateway Docker image.

```sh
docker pull prom/pushgateway

docker run -d -p 9091:9091 prom/pushgateway
```

#### 1.2.3. Grafana

Grafana is a multi-platform open source analytics and interactive visualization web application. It can produce charts, graphs, and alerts for the web when connected to supported data sources. Learn more at [Grafana Docs](https://grafana.com/docs/grafana/latest/)


### 1.3. Modes of Deployment
- Docker Compose on a Web Server: Deploy using a Docker Compose file.
- GitHub Action with Custom Runner: Set up the deployment within a GitHub Action workflow, using a custom runner.
- Local Execution Without Configuration: Run the tool locally with minimal setup by following these three simple steps:

### 1.4. Features

### 1.5. Advantages over other testing frameworks
* Only OSS components used to build the whole stack
* Put together by Hasura, used internally by Hasura
* Multiple Hasura enterprise customers using this tool to perform load and functional tests
* CLI, GUI and CI/CD options available to run the tool as opposed to just GUI.

Artillery's command-line interface and configuration files make it easy to integrate into continuous integration and deployment pipelines.
* Easily extendable, easily customizable
* Deploy it wherever you want - baremetal, cloud, virtual machines...
* Hasura provided dashboards to view the results which are frequently updated.
* Always up-to-date with Hasura version changes
* GraphQL-native support

Artillery has built-in support for GraphQL queries and mutations. It can parse GraphQL schemas and automatically generate valid requests, making it easier to create realistic test scenarios for GraphQL APIs.
#### 1.5.10 Lightweight and open-source

Artillery is a lightweight, open-source tool that's easy to set up and integrate into CI/CD pipelines. It has a lower barrier to entry compared to say, NeoLoad's enterprise-focused approach.
#### 1.5.11 Better suited for microservices

Artillery's design makes it well-suited for testing microservices architectures, which often go hand-in-hand with GraphQL APIs.
#### 1.5.12 Support for WebSocket testing

If your GraphQL API uses subscriptions over WebSockets, Artillery has good support for this, which can be crucial for real-time applications.

#### 1.5.12 Support for Mutations testing

If your GraphQL API uses Mutations, Artillery has good support for this, which can be crucial for real-time applications.


## 2. Deploying HTS

### 2.1. Standalone Mode

Checkout to the path in the repository

``` https://github.com/hasura/postsales/tree/main/Tools/hasura-performance-test-suite/ui-cli ```

Make changes to your docker-compose.yaml file

``` If you see a component in the docker-compose.yaml that you already have in your environment, you may remove that from the file. ```

Deploy using docker-compose

``` docker compose up -d ```

### 2.2. As a Github Action

- Clone the Repository and Push to Your Own Repository

  ``` https://github.com/hasura/postsales/tree/main/Tools/hasura-performance-test-suite/actions-config ```

- The workflow file is located under /hasura-test-suite/DDN/action/.github/workflows

- Configure the secrets as github secrets

- Configure the GraphQL Endpoint and Hasura Admin Secret

  ```json
  {
      "endpoint1":"secret1",
      "endpoint2":"secret2",
  }
  ```

   ```Note: You can modify the configuration to accept other headers ( if any ) and It is adivisable to use custom runner for your tests ```


## 3. Creating your first functional/Load test

For you to run a functional test, you need to install the expect plugin for Artillery (This comes pre-installed here, you dont need to do anything additional.)
The expect plugin adds support for checks and assertions on HTTP requests to enable functional testing in Artillery tests.
### 3.1 Features
* Use expectations and assertions in your HTTP scenarios

* Use the same artillery command to run functional / acceptance tests on your APIs

* See details of any failed assertions (request headers & body, response etc)

* Run post-deployment smoke tests from CI/CD pipelines

### 3.2 Add expectations to HTTP requests
```
scenarios:
  - name: Get a movie
    flow:
      - get:
          url: '/graphql'
          capture:
            - json: '$[5].title'
              as: title
          expect:
            - statusCode: 200
            - contentType: json
            - equals:
                - 'From Dusk Till Dawn'
                - '{{ title }}'
```
### 3.3 Metrics

The plugin tracks successful and failed expectations with custom metrics.

```
expect.ok - count of all expectations that have been successful
expect.failed - count of all expectations that failed
expect.ok.{type} - count of successful expectations of {type}, for example: expect.ok.statusCode for statusCode expectations
expect.failed.{type} - count of failed expectations of {type}, for example: expect.failed.statusCode for statusCode expectations
```
## 4. Running your first functional/load test

Run your script that uses expectations with:

```artillery run --quiet my-script.yaml```

(The --quiet option is to stop Artillery from printing its default reports to the console.)

```config:
  target: 'https://my.api.internal'
  environments:
    # This is our functional testing profile, with a single virtual user, and
    # the plugin enabled.
    #
    functional:
      phases:
        - duration: 1
          arrivalCount: 1
      plugins:
        expect: {}
scenarios:
  # Your scenario definitions go here.
  ```


### 4.1. From CLI

- Local Execution Without Configuration: Run the tool locally with minimal setup by following these three simple steps:

 1. Install Artillery: ```npm install -g artillery@latest```
  2. Create a test.yaml file with your test configurations.

    ```
    config:
      target: <GRAPHQL_ENDPOINT>
      defaults:
          headers:
            x-hasura-admin-secret: <ADMIN_SECRET>
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

  3. Run the test: artillery run test.yaml
  

Note: Queries can be looped and mutations can be tested using the [UI-CLI](https://github.com/hasura/postsales/tree/main/Tools/hasura-performance-test-suite/ui-cli/cli)


### 4.2. From Github Actions

#### 4.2.1 Input Parameters 

  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  - `HASURA_ADMIN_SECRET`:  Value of X_HASURA_ADMIN_SECRET
  - `TEST_DURATION`: Test duration in seconds (or Xh to set in hours)
  - `STARTING_ARRIVAL_RATE`: Starting calls per second value.
  - `ENDING_ARRIVAL_RATE`: At the end of your test duration, this will be your calls per second.
  - `MAXIMUM_VIRTUAL_USER`: Maximum number of virtual users
  - `TEST_NAME`:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)
  - `PUSHGATEWAY`: This is a component that pushes metrics to Prometheus. Enter the IP Address
  - `Service Name`: Folder level
  - `QUERY_FILE`: .graphql file name for load test and .yaml file for functional test in service folder


#### 4.2.2 Workflow for Functional/Load test

- Add Load and Functional Test Cases

  1. Load test file should be .graphql having all your queries

      example:

        ```gql
        query ArtistId {
          Artist (limit: 10) {
            ArtistId
          }
        }

        query ArtistName {
          Artist (limit: 10) {
            ArtistId
            Name
          }
        }

        query getCustomer {
          Customer (limit: 10) {
            City
            Company
            Country
          }
        }

        ```

  2. Functional test cases should be artillery scenarios

        example:

        ```yaml
        config:
        scenarios:
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

- Run the Workflow
  Navigate to the Actions tab in your repository, select the appropriate workflow, and click Run workflow to execute the tests.

  1. HTS - Functional Tests
  2. HTS - Load Tests

- On the Action workflow trigger Select `Run workflow`

  Add the required parameters and run the tests
  
## 5. Viewing your test results
 - A report can be generated for each tests [Artillery report](https://www.artillery.io/docs/reference/cli/report)
  ```sh
  artillery report [options] <file>
  ```
 - Custom Grafana Dashboards
<img width="1725" alt="Screenshot 2024-08-27 at 5 26 36 PM" src="https://github.com/user-attachments/assets/eb64dd6c-2ecc-4bbf-8391-a5dc0c8a9262">
<img width="1725" alt="Screenshot 2024-08-27 at 5 26 50 PM" src="https://github.com/user-attachments/assets/82841b86-2714-4cc7-94e2-ad1c4bb6005a">
<img width="1725" alt="Screenshot 2024-08-27 at 5 27 05 PM" src="https://github.com/user-attachments/assets/26d547d0-d8d9-48d4-848b-ed029f024f4b">
<img width="1725" alt="Screenshot 2024-08-27 at 5 27 21 PM" src="https://github.com/user-attachments/assets/c4d4eee3-58e2-4a91-bde2-70f9107571b3">



## 6. Current Limitations
- UI improvements
- Mutations support on UI

## 7. Roadmap

