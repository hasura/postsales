# Run test via CLI

## Load Testing

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


Note: Queries of only one file will be tested.

6. Update the env variables, each explained below
  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  - `HASURA_CLOUD_PAT`:  Value of HASURA_CLOUD_PAT
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


## Functional Testing


1. Clone Repository: Clone this repository to your local machine.
   ```sh
   git clone https://github.com/hasura/postsales.git
   ```

2. Install artillery
   ```sh
   npm install -g artillery@2.0.14
   ```

5. Add the functional test scenarios file in the `functionalTest` folder, following the syntax/example

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

5. Update the env variables, each explained below
  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  - `HASURA_CLOUD_PAT`:  Value of HASURA_CLOUD_PAT
  - `TEST_DURATION`: Test duration in seconds (or Xh to set in hours)
  - `STARTING_ARRIVAL_RATE`: Starting calls per second value.
  - `ENDING_ARRIVAL_RATE`: At the end of your test duration, this will be your calls per second.
  - `MAXIMUM_VIRTUAL_USER`: Maximum number of virtual users
  - `TEST_NAME`:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)
  - `PUSHGATEWAY`: This is a component that pushes metrics to Prometheus. Enter the IP Address


6. Run the test
   ```sh
  artillery run --config funtionalTest.yaml <file_name.yaml>
   
  example: artillery run --config funtionalTest.yaml functionalTest/validations.yaml
   ```
7. Checkout the metrics & dashboards on Grafana





## Local Execution Without Configuration:

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

  3. Run the test: 

  ```sh
  artillery run test.yaml
  ```
