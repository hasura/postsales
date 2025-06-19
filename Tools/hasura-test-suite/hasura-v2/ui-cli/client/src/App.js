import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css'
import { Sidebar } from './components/sidebar';
import TestPage from './components/run-test';
import GetTestQueryFiles from './components/queryfile';
import Doc from './components/documentation';
import LogViewer from './components/logs';
export default function Page() {
    const HomeContent = () => {
        const [values, setValues] = useState({});
        return (
            <div className="ml-64 p-4 mt-12 pl-10 max-w-5xl ">
            <h1 className="text-3xl font-bold">Performance Test Suite</h1>
            <div className='text-base py-4'>
                A system for load and functional testing of GraphQL APIs using the Artillery testing framework. Load testing involves evaluating the performance, scalability, and reliability of a GraphQL API under varying levels of simulated user traffic.

            </div>
            <h2 className="text-xl py-2 pb-2 font-bold">Configuration required:</h2>
            <ul className='pl-5 list-disc'>
                <li>Endpoint Schema</li>
                <li>Pushgateway</li>
                <li>Prometheus</li>
                <li>Grafana Dashboards</li>
            </ul>

            <div>
                <div className="text-xl py-2 pb-2 font-bold">Features:</div>
                <ul className='pl-5 list-disc flex flex-col gap-2'>
                    <li>
                        <p className='font-bold'>
                            Simulation of User Traffic
                        </p>
                        <p>
                            Simulate user traffic on GraphQL APIs to evaluate performance under varying loads.    </p>
                    </li>
                    <li>
                        <p className='font-bold'>Artillery Framework</p>
                        <p>Built on top of the Artillery framework to manage and execute complex test scenarios effectively.</p>
                    </li>

                    <li>
                        <p className='font-bold'>Performance Metrics</p>
                        <p>Generate comprehensive performance metrics including: Response Time, Request Rate, API Performance etc, mentioned in metric section</p>
                    </li>

                    <li>
                        <p className='font-bold'>Scalability Testing</p>
                        <p>Assess the scalability of GraphQL endpoints for Hasura instances.</p>
                    </li>

                    <li>
                        <p className='font-bold'>Web Interface</p>
                        <p>User-friendly web interface for configuring and running tests.</p>
                    </li>

                    <li>
                        <p className='font-bold'> Real-time Monitoring</p>
                        <p>Monitor test progress and performance through real-time logs and grafana dashboard.</p>
                    </li>

                    <li>
                        <p className='font-bold'> Grafana Dashboard</p>
                        <p>Built-in Grafana dashboard for visualizing key metrics and performance indicators.</p>
                    </li>
                </ul>
            </div>

            <div>
                <div className="text-xl py-2 pb-2 font-bold">Metrics:</div>
                <ul className='pl-5 list-disc flex flex-col gap-2'>
                    <li>
                        <p className='font-bold'>
                            Spread p99/p95/p50 Values:
                        </p>
                        <p>
                            Analyze the spread of p99 (99th percentile) and p95 (95th percentile) values to understand the performance distribution of your API responses
                        </p>
                    </li>
                    <li>
                        <p className='font-bold'>Peak and Average Payload Sizes:</p>
                        <p>Determine the peak and average payload sizes of your API responses. Peak payload size indicates the maximum data transferred in a single response, while average payload size gives an overview of the typical data size. Monitoring these metrics helps in optimizing network bandwidth and resource utilization. </p>
                    </li>
                    <li>
                        <p className='font-bold'> Highest, Lowest, and Average Response Times</p>

                    </li>
                    <li>
                        <p className='font-bold'>Total API Requests</p>
                    </li>
                    <li>
                        <p className='font-bold'>Error Rate </p>
                    </li>
                    <li>
                        <p className='font-bold'>Response Rate Over Time</p>
                    </li>
                    <li>
                        <p className='font-bold'>CPU/Memory Over Time</p>

                    </li>
                </ul>
            </div>

        </div>

        );
    };


    return (
        <div className="flex">
            <BrowserRouter>
                <div>
                    <Link className="App-link" to="/">Home</Link>
                    &nbsp;|&nbsp;
                    <Link className="App-link" to="/page2">Page2</Link>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Sidebar />
                        <HomeContent />
                    </Route>

                    <Route exact path="/run-test">
                        <TestPage />
                    </Route>
                    
                    <Route exact path="/documentation">
                        <Doc />
                    </Route>

                    <Route exact path="/logs">
                       <LogViewer />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

}
