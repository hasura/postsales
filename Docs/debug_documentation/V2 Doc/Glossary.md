### GraphQL Engine
The core component of Hasura that provides a real-time GraphQL API on top of your data sources.
### GraphQL
A query language for APIs that allows clients to request exactly the data they need and nothing more.

### GraphQL schema
Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. This is called the GraphQL schema. Hasura automatically generates a GraphQL Schema for you from the tables in your connected databases, Hasura Actions you've defined, and other connected GraphQL or REST endpoints. When queries come in, they are validated and executed against that schema.
### Docker
Docker is a system which allows the packaging up of code and all its dependencies so the an application runs quickly and reliably from one computing environment to another.

### Docker container
A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings. Hasura can be run as a Docker container.

### Docker image
Docker images become containers at runtime and in the case of Docker containers – images become containers when they run on Docker Engine which is available for both Linux and Windows-based applications, containerized software will always run the same, regardless of the infrastructure. Containers isolate software from its environment and ensure that it works uniformly despite differences for instance between development and staging. Hasura is distributed as a Docker image for the Community Edition at [DockerHub](https://hub.docker.com/r/hasura/graphql-engine).

### GraphQL query type

Every GraphQL service has a `query` type and may or may not have a mutation type. These types are the same as a regular object type, but they are special because they define the entry point of every GraphQL query. In Hasura the query type is generated for you in order to get data from your schema.

### GraphQL mutation type

The GraphQL `mutation` type is an optional type in the GraphQL specification but will be available to you on every configured Hasura endpoint in order to change or "mutate" data on your database, action or Remote Schema endpoints.

### GraphQL Data Plane for Hasura Enterprise Edition

The container(s) serving the GraphQL API and in the critical path of every request/response.

### Hasura account

An account on [hasura.io](https://hasura.io/) in which multiple instances of Hasura Cloud can be created.


### Hasura CE (Community Edition)

The open-source Community Edition of the Hasura GraphQL Engine.

### Hasura Cloud
The cloud-managed, optimized and massively scalable version of Hasura with the option to add the Hasura Enterprise Edition package and runs as a managed service. Hasura Cloud includes extra reliability, monitoring, caching, tracing, security and deployment features which aren't available in Hasura Community Edition.

### Hasura Cloud IP
A Hasura Cloud IP will be listed on the Hasura Cloud Dashboard for each project. Hasura will be connecting to your database from this IP address. If your database is not exposed to the internet, you must allow connections from this IP address on your firewall settings for Hasura Cloud Project to function properly. Otherwise, Hasura will not be able to connect to your database and the GraphQL API will not be available.

### Hasura Cloud Project
A Project is an individual GraphQL API hosted by Hasura Cloud. You can create a Project by going to the Hasura Cloud dashboard and then connecting a database from the Hasura Console. You can also provision a database on cloud platforms like Heroku from the Hasura Console itself.

Each project is allocated a unique auto-generated name and an ID. You can use this name or ID while communicating to Hasura team regarding this project. Each project is also assigned a GraphQL API endpoint of the format `https://<project-name>.hasura.app/v1/graphql`.

For example, a project might be called `usable-cobra-29` with ID `bf0ea856-76a2-42c2-8a91-66ca9b9206e8`.

### Hasura Collaborator Token
When you open the Hasura Console on a Cloud Project, you will not be asked to enter the admin secret like Hasura Community Edition version. Instead, if you are an admin, the Console will be accessible with the admin secret already set, or if you are a collaborator with limited access you will be automatically logged into the Console via an OAuth2.0 based authorization flow. You will be given the right access based on your permissions for the particular Hasura Cloud Project.

After the login process is complete, you'll see a new header called `Hasura-Collaborator-Token` in the "Request Headers" section of GraphiQL. This token is used instead of admin secret to authenticate and authorize all the requests made from the Console. The token is only valid for 5mins and is refreshed silently by the Console. It is to be used only from Console.

For accessing the API from other clients, use the admin secret or create a Personal Access Token.

### Hasura Enterprise Edition
A self-hosted version of Hasura that includes enterprise specific features for observability, security and more.

### Lux _or_ Control Plane (Enterprise Edition)
A set of services that powers the Hasura Enterprise Edition Control Plane that allows for user/team management, managing Hasura GraphQL configuration and includes a monitoring plane that ingests Hasura & GraphQL API metrics and makes it available over a UI and an API.

### Rolling Deployment
A rolling deployment is a deployment strategy that progressively replaces previous versions of an application with new versions. Rather than updating all servers or tiers simultaneously, the organization installs the updated software package on one server or subset of servers at a time. A rolling deployment helps reduce application downtime and prevent unforeseen consequences or errors in software updates.

### Queries
Operations used to fetch data from the GraphQL API.

### Mutations
Operations used to modify data in the GraphQL API, such as inserting, updating, or deleting records.

### Subscriptions
Real-time GraphQL queries that allow clients to receive updates whenever the underlying data changes.

### Relationships
Definitions in the metadata that specify how tables are related, enabling automatic joins and data fetching across related tables.

### Permissions
Rules that define which users or roles can access specific parts of the GraphQL API or perform certain operations.

### Remote Schemas:  
 Integration of external GraphQL schemas into Hasura, allowing you to extend your GraphQL API with additional functionality.

### Actions:  
Custom GraphQL mutations or queries that allow you to define custom business logic and execute it via Hasura’s GraphQL API.

### Event Triggers:  
Mechanisms to execute custom webhooks or serverless functions in response to database events, such as inserts, updates, or deletes.

### Hasura Console:  
The webbased user interface for managing and configuring Hasura, including schema management, permissions, and metadata.

### Integrations:  
Connections to external services or tools for authentication, logging, or other functionalities, which can be configured within Hasura.

### Data Sources:  
Databases or other services connected to Hasura that provide the data for the GraphQL API.

### CLI:  
Commandline interface tools, such as `hasuracli`, used for managing migrations, metadata, and other aspects of Hasura configuration.

### Migrations:  
Scripts that manage and track changes to the database schema over time, allowing you to apply or roll back changes.

### Introspection:  
The ability of GraphQL to query its own schema and provide details about available queries, mutations, and types.

### Custom Scalars:  
Userdefined types in GraphQL that extend the builtin scalar types (e.g., String, Int) to handle specific data formats.

### GraphQL Subscription Filters:  
Mechanisms to filter which data changes trigger subscriptions, allowing for more precise realtime updates.

### Query Caching: 
The ability to cache query results to improve performance and reduce load on the database.

### Relay:  
A JavaScript framework for building datadriven React applications that can integrate with Hasura’s GraphQL API.

### Batching:  
A technique to optimize performance by combining multiple requests into a single batch.


### REST Endpoints: 
Exposing parts of your GraphQL API as RESTful endpoints for compatibility with existing systems or services.


### Database Relationships:  
Definitions of how tables in a database are related, which are used to automatically generate joins and data fetching in GraphQL.

### Query Optimization:  
Techniques and tools to improve the performance of GraphQL queries and reduce response times.

### Schema Management:  
The process of defining and updating the structure of the GraphQL schema, including types, queries, mutations, and relationships.

### Data Modeling:  
The process of designing and structuring your database schema to support efficient and effective GraphQL queries.

### Clientside Caching:  
Techniques for caching data on the client side to improve performance and reduce redundant requests to the server.

### Serverless Functions:  
Functions that are executed in response to events, often used in conjunction with event triggers in Hasura.

### Schema Directives: 
Special annotations in your GraphQL schema that modify how the schema behaves or interacts with other components.

### API Gateway:  
A service that provides a single entry point for managing and routing requests to multiple APIs, often used in conjunction with Hasura.

### Data Federation:  
Combining data from multiple sources into a single GraphQL API, enabling a unified view of disparate data sources.

### Rate Limiting:  
Controls to limit the number of requests a client can make to the GraphQL API within a certain timeframe.

### Authentication:  
Mechanisms for verifying the identity of users or clients accessing the GraphQL API.

### Authorization:  
Controls for determining what actions or data a user or client is permitted to access within the GraphQL API.

### Database Triggers:  
Database level triggers that can be used in conjunction with Hasura event triggers for more complex automation.

### Custom Scalars: 
User defined scalar types in GraphQL that extend the standard scalar types to handle specific data formats.

### Deployment Strategies:  
Methods for deploying Hasura and its associated components to different environments, such as development, staging, and production.

### GraphQL Subscriptions: 
Realtime data updates delivered via WebSocket connections, allowing clients to receive immediate notifications of changes.



