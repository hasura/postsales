
# Onboarding Guide: Hasura Test Suite



- [Onboarding Guide: Hasura Test Suite](#onboarding-guide-hasura-test-suite)
  - [Overview](#overview)
  - [Onboarding Steps](#onboarding-steps)
  - [Repository Structure Overview](#repository-structure-overview)
  - [Key Directories](#key-directories)
  - [Creating Your Team Folder](#creating-your-team-folder)
  - [Writing Test Cases](#writing-test-cases)
    - [Functional Test](#functional-test)
    - [Load Test](#load-test)
  - [Running Tests via GitHub Actions](#running-tests-via-github-actions)
  - [Sharing Results](#sharing-results)


## Overview

This document outlines the onboarding process for contributing to the Hasura Test Suite. Each team is responsible for creating and running both functional and load tests, and sharing their results.

---

## Onboarding Steps

1. Walk through the test suite repository.
2. Write a functional test case in your team’s folder.
3. Write a load test case in your team’s folder.
4. Run the two GitHub Action workflows (for both test cases) on the sandbox environment.
5. Share your results or Grafana dashboard link.

---

## Repository Structure Overview

```
hasura-test-suite/
├── README.md
├── .gitignore
├── library/
│   ├── functionalTest/
│   │   ├── team1/
│   │   ├── team2/
│   │   │   └── test.yaml
│   │   └── team3/
│   └── loadTest/
│       ├── team1/
│       ├── team2/
│       │   └── test.graphql
│       └── team3/
├── sample_functionalTest.yml
├── sample_loadTest.graphql
├── tests/
├── action.yaml
└── introspection.yaml
```

---

## Key Directories

- `.github/` and `tests/` – Contains GitHub Action workflows for test automation.
- `library/` – Contains the test cases:
  - `functionalTest/` – Folder for functional GraphQL test cases.
  - `loadTest/` – Folder for load testing scenarios.

---

## Creating Your Team Folder

To begin:

1. Navigate to `library/functionalTest/teamX/` and add a functional test case.
2. Navigate to `library/loadTest/teamX/` and add a load test case.
3. Use your team’s name to name files consistently (e.g., `team1_functional.yaml`, `team1_load.graphql`).

Example folder structure:

```
library/
├── functionalTest/
│   ├── team1/
│   │   ├── team1_functional.yaml
│   │   └── test.yaml
├── loadTest/
│   ├── team1/
│   │   ├── team1_load.graphql
│   │   └── test.graphql
```

---

## Writing Test Cases

### Functional Test

Functional tests validate GraphQL queries and mutations.

Example (`team2_functional.yaml`):

```yaml
config:
  scenarios:
    - name: 'Read/query with a simple filter - non-nullable variable with a non-null value'
      flow:
        - post:
            url: "/"
            json:
              query: |
                query MyQuery($userid: bigint!) {
                  artist(where: {userid: {_eq: $userid}}) {
                    userid
                    username
                  }
                }
              variables:
                userid: 1
            expect:
              - statusCode: 200
              - json:
                  data:
                    artist:
                      - userid: 1
                        username: "Raju"
```

---

### Load Test

Load tests simulate traffic to test the performance of GraphQL APIs under load.

Example (`team1_load.graphql`):

```graphql
query ArtistId {
  Artist(limit: 10) {
    ArtistId
  }
}
```

---

## Running Tests via GitHub Actions

1. Go to the **Actions** tab in the repository.
2. Select the relevant workflow (Functional or Load Test).
3. Click **Run workflow** and provide test parameters.
4. Monitor the execution and results via the GitHub Actions console or Grafana.

---

## Sharing Results

After running your tests:

- Share output logs or screenshots.
- Include Grafana dashboard links or summaries if available.

---

