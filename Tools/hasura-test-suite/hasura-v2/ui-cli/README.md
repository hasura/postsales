<!-- PROJECT LOGO -->
<br />
<div align="left">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://res.cloudinary.com/dh8fp23nd/image/upload/v1711457033/main-web/hasura_logo_primary_darkbg_nussjm.svg" alt="Logo" height="60">
  </a>

<h3 align="left">Hasura Test Suite</h3>

  <p align="left">
   Contriving a system for load and functional testing of GraphQL APIs using the Artillery testing framework. Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.
    <br />
  </p>
</div>





<!-- ABOUT THE PROJECT -->
## About The Project
![final_git](https://github.com/GouravHasura/hts/assets/121481835/a18c1027-2d41-4156-b031-59f7b7a79234)


A system for load and functional testing of GraphQL APIs using the Artillery testing framework. 
Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.

The system has multiple components which can be configured. 

### What is this tool?

- This tool is designed as a load testing API, meaning it's intended to simulate and measure the performance API, particularly those running GraphQL APIs.

- It's built on top of the Artillery framework, leveraging its capabilities to generate and manage complex test scenarios.

- With this tool, users can assess various performance metrics, such as response time, request rate, overall API performance, and receive debugging alerts to identify potential issues.



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Node
* node>18
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone Repository: Clone this repository to your local machine.
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create and add env in `.env`, as mentioned in env_example
   ```sh
   HASURA_PROJECT_ENDPOINT = <ENTER_YOUR_API_ENDPOINT>
   HASURA_ADMIN_SECRET= <ADMIN_SECRET>
   ```
4. Generate the schema of the GraphQL endpoint
   ```sh
   npm run codegen
   ```
5. Build and Run Docker Images
   ```sh
   docker compose up
   ```
6. Open port:3000



<!-- USAGE EXAMPLES -->
## Usage

`What does this tool do?`

- This tool specializes in load testing GraphQL servers, allowing developers and system administrators to understand how well their servers perform under different loads and scenarios.

- It provides a comprehensive set of metrics to help evaluate the performance of the GraphQL endpoint, offering insights into crucial aspects like HTTP responses, request rates, error rates, and response times.

- Furthermore, it goes beyond basic metrics by providing detailed performance breakdowns, including query response times, which can be crucial for understanding how different parts of the API perform under load.

- Notably, it also offers scalability metrics specifically tailored for Hasura instances, providing valuable insights into the scalability of the Hasura instance.


## How to run tests?

### Using Web Interface

Running tests with this tool involves several steps to set up, execute, and analyze the results.

- Users start by inputting the desired configurations: test scenario, target server, and desired load.

- After configuring the tests, users initiate the testing process, which triggers the tool to send requests to the GraphQL server according to the specified parameters.

- During the test run, users can monitor the progress and performance through real-time logs, which provide insights into the behavior of the server under load.

- Once the tests are completed, users can analyze the collected data using the built-in grafana dashboard, which visualizes key metrics and performance indicators, aiding in identifying bottlenecks and areas for optimization.

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

## Additional Config

- To fetch the CPU and Memory usage statistics from the target node.
- To get these graphs two metrics are required:
  - node_memory_MemTotal_bytes: The total memory size of the instance.
  - node_memory_Active_bytes: Active memory being used.
  
## Adding Queries

- The test queries needs to be added before running the docker container.
- Queries to be added in the `graphQL/queries` folder in the .graphql file.
- Example queries file:
  ```sh
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
## Adding Mutations

- Please refer to the [cli documentation](https://github.com/GouravHasura/hts/tree/main/cli)


## Results

- Detailed performance metrics and visualizations through the Grafana dashboard on `port:4000`, which offers insights into various aspects of server performance, such as response times, error rates. 

- Additionally, users can access metrics through a Prometheus instance on `port:9090`, 

## Pushgateway Setup

- If there are no metrics on grafana. Check the prometheus configuration ( port:9090 ), `Menu` -> `Status` -> `Targets`
- If the pushgateway server is down, hardcode the server address on prometheus.yml file ( root -> prometheus - > prometheus.yml ) to establish the connection.


## App
<img width="1718" alt="Screenshot 2024-04-30 at 1 46 37 PM" src="https://github.com/GouravHasura/hts/assets/121481835/913a432e-42ca-4ff7-a376-6842805cc2a2">
<img width="1718" alt="Screenshot 2024-04-30 at 1 49 49 PM" src="https://github.com/GouravHasura/hts/assets/121481835/021944d2-301a-42f1-a3f6-8723737cfaa7">



<!-- ROADMAP -->
## Roadmap

- [ ] Dashboards
- [ ] Mutation Support on web

 
