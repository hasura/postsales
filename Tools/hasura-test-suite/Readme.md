# Hasura Test Suite (HTS) Documentation

## Table of contents

- [Hasura Test Suite (HTS) Documentation](#hasura-test-suite-hts-documentation)
  - [1. About HTS](#1-about-hts)
    - [1.1. Overview](#11-overview)
    - [1.2. Components](#12-components)
    - [1.3. Modes of Deployment](#13-modes-of-deployment)
    - [1.4. Features](#14-features)
    - [1.5. Advantages over other testing frameworks](#15-advantages-over-other-testing-frameworks)
  - [2. Deploying HTS](#2-deploying-hts)
    - [2.1. Hasura DDN: Please refer to the [documentation]()](#21-hasura-ddn-please-refer-to-the-documentation)
    - [2.2. Hasura V2: Please refer to the [documentation]()](#22-hasura-v2-please-refer-to-the-documentation)
  - [3. Creating your first functional/Load test](#3-creating-your-first-functionalload-test)
    - [3.1 Features](#31-features)
    - [3.2 Add expectations to HTTP requests](#32-add-expectations-to-http-requests)
    - [3.3 Metrics](#33-metrics)
    - [3.4 Results/Summary](#34-resultssummary)
  - [References:](#references)



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

2.1. Hasura DDN: Please refer to the [documentation](https://github.com/hasura/postsales/tree/main/Tools/hasura-test-suite/DDN#modes-of-deployment)

2.2. Hasura V2: Please refer to the [documentation](https://github.com/hasura/postsales/tree/main/Tools/hasura-test-suite/hasura-v2#2-deploying-hts)


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

### 3.4 Results/Summary

- Artillery provides different metrics as a summary
- Custom artillery report can be generated using: 

    Generating an HTML report
    First, run a test and create a JSON report with the --output flag.

    ```
    artillery run --output test-run-report.json my-script.yaml
    
    ```

    You can then use the generated JSON report to create an HTML report:
    
    ```
    artillery report test-run-report.json
    
    ```

This will create a test-run-report.json.html file in the current directory which you can open in a browser.


#### 3.4.1 Grafana Dashboards

Grafana dashboards can be found [here](https://github.com/hasura/postsales/tree/main/Tools/hasura-test-suite/hasura-v2/ui-cli/grafana) 


## References:
1. https://www.artillery.io/docs/get-started/get-artillery
2. https://www.artillery.io/docs/get-started/first-test
3. https://www.artillery.io/docs/get-started/core-concepts
