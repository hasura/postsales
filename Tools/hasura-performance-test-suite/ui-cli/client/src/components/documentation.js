import React from 'react';
import { Sidebar } from './sidebar';


const MainContent = () => {
    return (
      <div className='flex flex-col ml-[20rem] mt-10 pb-20 max-w-[800px]'>
      {/* PROJECT LOGO */}
      <div className="flex flex-col">
        <a href="https://github.com/github_username/repo_name">
          <img src="https://res.cloudinary.com/dh8fp23nd/image/upload/v1711457033/main-web/hasura_logo_primary_darkbg_nussjm.svg" alt="Logo" className="h-16" />
        </a>
        <h3 className="mt-4 text-2xl font-bold">Hasura Test Suite</h3>
      </div>

      <p className="mt-4">
        Contriving a system for load and functional testing of GraphQL APIs using the Artillery testing framework. Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.
        <br />
        <a href="https://github.com/github_username/repo_name" className="text-blue-500 hover:underline">View Repo</a>
      </p>

      {/* ABOUT THE PROJECT */}
      <h2 className="mt-8 text-2xl font-bold">About The Project</h2>

      <p>
        A system for load and functional testing of GraphQL APIs using the Artillery testing framework.
        Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.
      </p>

      <p className="mt-4 font-bold">What is this tool?</p>

      <ul className="list-disc ml-8">
        <li>
          This tool is designed as a load testing API, meaning it's intended to simulate and measure the performance API, particularly those running GraphQL APIs.
        </li>
        <li>
          It's built on top of the Artillery framework, leveraging its capabilities to generate and manage complex test scenarios.
        </li>
        <li>
          With this tool, users can assess various performance metrics, such as response time, request rate, overall API performance, and receive debugging alerts to identify potential issues.
        </li>
      </ul>

      {/* GETTING STARTED */}
      <h2 className="mt-8 text-2xl font-bold">Getting Started</h2>

      <p className="mt-2">This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.</p>

      <p className="mt-4 font-bold">Prerequisites</p>

      <ul className="list-disc ml-8 mt-2">
        <li>
          This is an example of how to list things you need to use the software and how to install them.
        </li>
      
          <code className="bg-gray-200 p-1">npm install npm@latest -g</code>
        
      </ul>

      <p className="mt-4 font-bold">Installation</p>

      <ol className="list-decimal ml-8 mt-2">
        <li>
          Clone Repository: Clone this repository to your local machine.
          <pre className="bg-gray-200 p-1"><code className="language-sh">git clone https://github.com/github_username/repo_name.git</code></pre>
        </li>
        <li>
          Install NPM packages
          <pre className="bg-gray-200 p-1"><code className="language-sh">npm install</code></pre>
        </li>
        <li>
          Create and add env in <code>.env</code>, as mentioned in <code>env_example</code>
          <pre className="bg-gray-200 p-1"><code className="language-sh">
            HASURA_PROJECT_ENDPOINT = &lt;ENTER_YOUR_API_ENDPOINT&gt;<br />
            HASURA_ADMIN_SECRET= &lt;ADMIN_SECRET&gt;</code></pre>
        </li>
        <li>
          Generate the schema of the GraphQL endpoint
          <pre className="bg-gray-200 p-1"><code className="language-sh">npm run codegen</code></pre>
        </li>
        <li>
          Build and Run Docker Images
          <pre className="bg-gray-200 p-1"><code className="language-sh">docker compose up</code></pre>
        </li>
        <li>
          Open port:3000
        </li>
      </ol>

      {/* USAGE EXAMPLES */}
      <h2 className="mt-8 text-2xl font-bold">Usage</h2>

     

      <ul className="list-disc ml-8 mt-2">
        <li>
          This tool specializes in load testing GraphQL servers, allowing developers and system administrators to understand how well their servers perform under different loads and scenarios.
        </li>
        <li>
          It provides a comprehensive set of metrics to help evaluate the performance of the GraphQL endpoint, offering insights into crucial aspects like HTTP responses, request rates, error rates, and response times.
        </li>
        <li>
          Furthermore, it goes beyond basic metrics by providing detailed performance breakdowns, including query response times, which can be crucial for understanding how different parts of the API perform under load.
        </li>
        <li>
          Notably, it also offers scalability metrics specifically tailored for Hasura instances, providing valuable insights into the scalability of the Hasura instance.
        </li>
      </ul>

      <h2 className="mt-8 text-2xl font-bold">How to run tests?</h2>

      <p className="mt-4 font-bold">Using Web Interface</p>

      <p>Running tests with this tool involves several steps to set up, execute, and analyze the results.</p>

      <ol className="list-decimal ml-8">
        <li>
          Users start by inputting the desired configurations: test scenario, target server, and desired load.
        </li>
        <li>
          After configuring the tests, users initiate the testing process, which triggers the tool to send requests to the GraphQL server according to the specified parameters.
        </li>
        <li>
          During the test run, users can monitor the progress and performance through real-time logs, which provide insights into the behavior of the server under load.
        </li>
        <li>
          Once the tests are completed, users can analyze the collected data using the built-in Grafana dashboard, which visualizes key metrics and performance indicators, aiding in identifying bottlenecks and areas for optimization.
        </li>
      </ol>

      <p className="font-bold mt-2">Command Line</p>

      <ol className="list-decimal ml-8 mt-2">
        <li>
          Clone Repository: Clone this repository to your local machine.
          <pre className="bg-gray-200 p-1"><code className="language-sh">git clone https://github.com/github_username/repo_name.git</code></pre>
        </li>
        <li>
          Install NPM packages in cli directory
          <pre className="bg-gray-200 p-1"><code className="language-sh">cd cli<br />npm install</code></pre>
        </li>
        <li>
          Install artillery
          <pre className="bg-gray-200 p-1"><code className="language-sh">npm install -g artillery@latest</code></pre>
        </li>
        <li>
          Generate the GraphQL API Schema
          <pre className="bg-gray-200 p-1"><code className="language-sh">npm run codegen</code></pre>
        </li>
        <li>
          Add all the .graphql files in the graphQL/queries.
          <pre className="bg-gray-200 p-1"><code className="language-sh">cd graphQL/queries</code></pre>
          Note: Queries of only files will be tested
        </li>
        <li>
          Update the env variables, each explained below
          <ul className="list-disc ml-8">
            <li>GRAPHQL_ENDPOINT: The GraphQL endpoint for your Hasura Instance</li>
            <li>HASURA_ADMIN_SECRET:  Value of X_HASURA_ADMIN_SECRET</li>
            <li>TEST_DURATION: Test duration in seconds (or Xh to set in hours)</li>
            <li>STARTING_ARRIVAL_RATE: Starting calls per second value.</li>
            <li>ENDING_ARRIVAL_RATE: At the end of your test duration, this will be your calls per second.</li>
            <li>MAXIMUM_VIRTUAL_USER: Maximum number of virtual users</li>
            <li>TEST_NAME:  A unique name for this test run to identify in Grafana (PG_6hr_loadtest)</li>
            <li>PUSHGATEWAY: This is a component that pushes metrics to Prometheus. Enter the IP Address</li>
            <li>QUERY_FILE: .graphql file name, as modified in graphQL/queries directory</li>
          </ul>
        </li>
        <li>
          Run the test
          <pre className="bg-gray-200 p-1"><code className="language-sh">artillery run artilleryTest.yml --dotenv=.env</code></pre>
        </li>
        <li>
          Checkout the metrics on Grafana
        </li>
      </ol>

      <h2 className="mt-8 text-2xl font-bold">Results</h2>

      <p className='mt-2'>
        Detailed performance metrics and visualizations through the Grafana dashboard on port:4000, which offers insights into various aspects of server performance, such as response times, error rates.
      </p>

      <p>Additionally, users can access metrics through a Prometheus instance on port:9090.</p>

    </div>
    );
};

export default function Doc(){
  return(
    <div className="flex">
    <Sidebar />
    <MainContent />
  </div>
  )
};
