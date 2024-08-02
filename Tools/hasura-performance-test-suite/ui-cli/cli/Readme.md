## Command Line
To Load test using terminal, follow the steps:
1. Install the dependencies
2. Generate the graphQL schema
3. Add the env variables in .env file.
4. Add query files, following the example file

### Detailed Steps
1. Clone Repository: Clone this repository to your local machine.
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages in cli directory
   ```sh
   cd cli
   npm install
   ```
4. Install artillery
   ```sh
   npm install -g artillery@latest
   ```

4. Generate the GraphQL API Schema
  ```sh
   npm run codegen
   ```

5. Add all the .graphql files in the `graphQL/queries`, following the syntax/example
  ```sh
   cd graphQL/queries
   ```
Note: Queries of only one file will be tested.

5. Update the env variables, each explained below
  - `GRAPHQL_ENDPOINT`: The GraphQL endpoint for your Hasura Instance
  -  `HASURA_ADMIN_SECRET`:  Value of X_HASURA_ADMIN_SECRET
  - `TEST_DURATION`: Test duration in seconds (or Xh to set in hours)
  - `STARTING_ARRIVAL_RATE`: Starting calls per second value.
  - `ENDING_ARRIVAL_RATE`: At the end of your test duration, this will be your calls per second.
  - `MAXIMUM_VIRTUAL_USER`: Maximum number of virtual users
  - `TEST_NAME`:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)
  - `PUSHGATEWAY`: This is a component that pushes metrics to Prometheus. Enter the IP Address
  - `QUERY_FILE`: .graphql file name, as modified in graphQL/queries directory

6. Run the test
   ```sh
   artillery run artilleryTest.yml --dotenv=.env
   ```
7. Checkout the metrics on Grafana



## Mutations Overview

The GraphQL Args Generator is a tool that generates random input arguments for GraphQL mutations based on a provided YAML configuration file.

## Features

- Reads a YAML configuration file containing mutation details.
- Generates random input arguments for each mutation based on specified parameters.
- Outputs the generated arguments as a JSON file.
- The generator.js can be modified as per the requirement.


## How it Works

1. **Configuration File**: Create a YAML file (`mutations.yml`) specifying the mutations, their parameters, and the number of calls.

    ```yaml
    mutations:
      - name: insert_Artist
        parameters:
          - name: ArtistName
            type: randomstring
          - name: id
            type: Int
            startValue: 1000
        calls: 1000
      - name: insert_Album
        parameters:
          - name: AlbumName
            type: 'hello'
          - name: id
            type: Int
            startValue: 1000
        calls: 100
    ```

2. **Generate Args**: Run the `generator.js` script to generate random arguments based on the configuration.

    ```bash
    npm run generate-mutations-args
    ```

3. **Output File**: The generated arguments will be saved to `generatedArgs.json`.
