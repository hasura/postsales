1) About Hasura Testsuite

Hasura test-suite is an open source tool built around the Artillery open source framework. We have optimized this to work beter with Hasures V2, being able to use this tool as your single source to perform both functional validations and performance testing of a Hasura deployment.

  1.1) Overview

  1.2) Components

  1.3) Modes of deployment

  1.4) Features

  1.5) Advantages over other test-suites

2) Deployment

  2.1) As a standalone tool

  2.2) As a github action

3) Creating your first functional test-case

4) Running a functional test

  4.1) From CLI or GH Actions

5) Creating your first loadtest

6) Running your first load-test

  6.1) Standalone mode, CLI or GH Actions

7) View test results

  7.1) Included Grafana dashboards

8) Current limitations

9) Roadmap

10) Provide feedback




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

### Components

#### UI-CLI

Tests can be performed using the UI provided by the Docker image, or through the CLI.

#### Github-actions

Tests can be configured to run via GitHub Actions at the enterprise level. Secrets should be added to GitHub Secrets in the following format:


```
{
    "endpoint1":"secret1",
    "endpoint2":"secret2",
}
```

<!-- GETTING STARTED -->
## Getting Started

WIP


<!-- USAGE EXAMPLES -->
## Usage

`What does this tool do?`

- This tool specializes in load testing GraphQL servers, allowing developers and system administrators to understand how well their servers perform under different loads and scenarios.

- It provides a comprehensive set of metrics to help evaluate the performance of the GraphQL endpoint, offering insights into crucial aspects like HTTP responses, request rates, error rates, and response times.

- Furthermore, it goes beyond basic metrics by providing detailed performance breakdowns, including query response times, which can be crucial for understanding how different parts of the API perform under load.

- Notably, it also offers scalability metrics specifically tailored for Hasura instances, providing valuable insights into the scalability of the Hasura instance.


<!-- ROADMAP -->
## Roadmap
- [ ] V3
- [ ] Dashboards
- [ ] Mutation Support on web
