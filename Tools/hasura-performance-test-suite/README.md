# Hasura Test Suite (HTS) Documentation

## 1. About HTS

Hasura Test Suite (HTS) is an open source tool built around the Artillery open source framework. We have optimized this to work beter with Hasura V2, being able to use this tool as your single source to perform both functional validations and performance testing of any Hasura deployment. HTS supports both self-hosted and Hasura cloud deployments of Hasura. DDN support is coming next week.

### 1.1. Overview

### 1.2. Components

#### 1.2.1. Artillery Framework
Artillery is designed for testing backend systems, such as API services, ecommerce backends, chat systems, game backends, databases, message brokers and queues, and anything else that can be communicated with over a network.

With Artillery, you can create test scripts that can test common workflows for GraphQL to smoke out any potential performance issues that can creep up when you least expect. Running regular load tests on your APIs both during development and against your production servers will keep your APIs performant and resilient for your customers. This article shows you how to use Artillery to keep your GraphQL services in check. Learn more at [Artillery Website](https://www.artillery.io/docs)

#### 1.2.2. Prometheus Pushgateway
The Prometheus Pushgateway exists to allow ephemeral and batch jobs to expose their metrics to Prometheus. Since these kinds of jobs may not exist long enough to be scraped, they can instead push their metrics to a Pushgateway. The Pushgateway then exposes these metrics to Prometheus. In our specific example, we use the Pushgateway to export the Artillery Test metrics to the Prometheus instance deployed as part of HTS (or to your existing Prometheus environment) and use these metrics to create charts. Learn more at [Prometheus Pushgateway Github](https://github.com/prometheus/pushgatewa)

#### 1.2.3. Grafana

Grafana is a multi-platform open source analytics and interactive visualization web application. It can produce charts, graphs, and alerts for the web when connected to supported data sources. Learn more at [Grafana Docs](https://grafana.com/docs/grafana/latest/)


### 1.3. Modes of Deployment

### 1.4. Features

### 1.5. Advantages over other testing frameworks
#### 1.5.1 Only OSS components used to build the whole stack
#### 1.5.2 Put together by Hasura, used internally by Hasura
#### 1.5.3 Multiple Hasura enterprise customers using this tool to perform load and functional tests
#### 1.5.4 CLI, GUI and CI/CD options available to run the tool as opposed to just GUI.

Artillery's command-line interface and configuration files make it easy to integrate into continuous integration and deployment pipelines.
#### 1.5.5 Easily extendable, easily customizable
#### 1.5.6 Deploy it wherever you want - baremetal, cloud, virtual machines...
#### 1.5.7 Hasura provided dashboards to view the results which are frequently updated.
#### 1.5.8 Always up-to-date with Hasura version changes
#### 1.5.9 GraphQL-native support

Artillery has built-in support for GraphQL queries and mutations. It can parse GraphQL schemas and automatically generate valid requests, making it easier to create realistic test scenarios for GraphQL APIs.
#### 1.5.10 Lightweight and open-source

Artillery is a lightweight, open-source tool that's easy to set up and integrate into CI/CD pipelines. It has a lower barrier to entry compared to say, NeoLoad's enterprise-focused approach.
#### 1.5.11 Better suited for microservices

Artillery's design makes it well-suited for testing microservices architectures, which often go hand-in-hand with GraphQL APIs.
#### 1.5.12 Support for WebSocket testing

If your GraphQL API uses subscriptions over WebSockets, Artillery has good support for this, which can be crucial for real-time applications.

## 2. Deploying HTS

### 2.1. Standalone Mode

Checkout the repository

``` git clone https://github.com/hasura/postsales/tree/main/Tools/hasura-performance-test-suite/ui-cli ```

Make changes to your docker-compose.yaml file

``` If you see a component in the docker-compose.yaml that you already have in your environment, you may remove that from the file. ```

Deploy using docker-compose

``` docker compose up -d ```

### 2.2. As a Github Action

## 3. Creating your first functional test

## 4. Running your first functional test

### 4.1. From CLI

### 4.2. From Github Actions

## 5. Creating your first load test

## 6. Running your first load-test

### 6.1. Standalone Mode

### 6.2. CLI

### 6.3. Github Action

## 7. Viewing your test results

## 8. Current Limitations

## 9. Roadmap

## 10. Feedback
