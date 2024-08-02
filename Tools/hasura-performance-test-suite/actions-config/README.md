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


A system for load and functional testing of GraphQL APIs using the Artillery testing framework. 
Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.

The system has multiple components which can be configured. 

### What is this tool?

- This tool is designed as a load testing API, meaning it's intended to simulate and measure the performance API, particularly those running GraphQL APIs.

- It's built on top of the Artillery framework, leveraging its capabilities to generate and manage complex test scenarios.

- With this tool, users can assess various performance metrics, such as response time, request rate, overall API performance, and receive debugging alerts to identify potential issues.



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you can run the test on Github actions.

  
## Adding Load Test Scenario

- The test queries needs to be added before running any load test. 
- Queries to be added in the `library/loadTest/<Service>` folder.
- Multiple query files can be added in the respective folder depending on the use case.
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
## Adding Functional Test Cases

- Functional Test Cases shall be added in  `library/functionalTest/<Service>` folder.
- Functional scenarios shall only be defined in the `.yml` file
- Example queries file:
  ```sh
  config:
  scenarios:
  - name: Null Scenario
    flow:
      - post:
          url: "/"
          json:
            query: | 
              query testQuery($userid: Int!) {
                Artist (where: {id: {_eq: $userid}}) {
                  name
                  id
                }
              }
            
            variables:
              userid:1
          expect:
            - statusCode:200
   ```

## Results

- Detailed performance metrics and visualizations through the Grafana dashboard, which offers insights into various aspects of server performance, such as response times, error rates. 

- Additionally, users can access metrics through a Prometheus instance. 

## Pushgateway Setup

- If there are no metrics on grafana. Check the prometheus configuration ( port:9090 ), `Menu` -> `Status` -> `Targets`


<!-- ROADMAP -->
## Roadmap

- [ ] Todo
- [ ] 

 
