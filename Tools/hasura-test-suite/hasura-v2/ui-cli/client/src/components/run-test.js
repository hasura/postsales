import React, { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import GetTestQueryFiles from './queryfile';

import axios from 'axios';
export default function TestPage() {
  const MainContent = () => {
    const [disableDuration, setDisableDuration] = useState(0); // State variable to hold disable duration in seconds
  
    const [values, setValues] = useState({});
    const handleInputChange = (fieldName, value) => {
      setValues((prevState) => ({
        ...prevState,
        [fieldName]: value
      }));

    };

    const handleSaveToFile = () => {
      if (disableDuration > 0) return;
      const content = JSON.stringify(values, null, 2);
      // setenvValues(values)
      sendDataToBackend(values)
      console.log(content);
      if (values['Test Duration']) {
         setDisableDuration(values['Test Duration'])
        // router.push('/logs');
      }

    };

    const Data = [
      {
        name: "GraphQL Endpoint",
        description: "The GraphQL endpoint for your Hasura Instance"
      },
      {
        name: "Hasura Admin Secret",
        description: "Value of X_HASURA_ADMIN_SECRET"
      },
      {
        name: "Test Duration",
        description: "Test duration in seconds (or Xh to set in hours)"
      },
      {
        name: "Starting Arrival Rate",
        description: "Starting calls per second value."
      },
      {
        name: "Ending Arrival Rate ",
        description: "At the end of your test duration, this will be your calls per second."
      },
      {
        name: "Maximum Virtual Users",
        description: "Maximum number of virtual users"
      },
      {
        name: "Test Name",
        description: "A unique name for this test run to identify in Grafana (PG_6hr_loadtest)"
      },
      {
        name: "Pushgateway",
        description: "This is a component that pushes metrics to Prometheus. Enter the IP Address"
      },
                                                                                                               ]
    useEffect(() => {
      if (disableDuration > 0) {
        const timer = setTimeout(() => {
          setDisableDuration((prevDuration) => prevDuration - 1); // Decrement disableDuration after 1 second
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearTimeout(timer); // Cleanup function to clear the timeout when component unmounts or when disableDuration becomes 0
      }
    }, [disableDuration]); //
    return (
      <div className="ml-64 p-4 mt-12">
        <div>
          <h1 className="text-2xl pl-10 font-bold">Hasura Test Setup</h1>
          <div className="grid grid-cols-2 gap-4">
            {Data.map((value, index) => (
              <div key={index} className="flex flex-col gap-4 px-10 ">
                <div>
                  <label className="flex text-md items-center mt-6 text-center font-medium text-gray-700">{value.name}</label>
                  <p className="flex text-xs items-center font-medium text-blue-700">{value.description}</p>
                </div>
                <input
                  type="text"
                  className="flex -mt-2 w-full border px-2 border-neutral-300 rounded-xl h-10"
                  value={values[value.name] || ''}
                  onChange={(e) => handleInputChange(value.name, e.target.value)}
                />
              </div>
            ))
            }
          </div>
          {/* <div>
            <PGEndpointChecker />
          </div> */}
          <div className='ml-10 flex flex-row mt-10'>
            <GetTestQueryFiles />
          </div>
          <div>
            <button
              className={`bg-blue-600 cursor-pointer whitespace-nowrap w-fit min-w-[200px] hover:bg-blue-800 mt-10 ml-10 rounded-full px-4 py-3 text-neutral-0 ${disableDuration > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSaveToFile}
              disabled={disableDuration > 0}
            >
              {disableDuration > 0 ? `Please wait ${disableDuration} seconds` : 'Run Test'}
            </button>
          </div>
        </div>
      </div>

    );
  };
  const fields = [
    "GRAPHQL_ENDPOINT",
    "X_HASURA_ADMIN_SECRET",
    "DURATION",
    "ARRIVAL_RATE",
    "RAMPTO",
    "MAX_V_USERS",
    "PUSHGATEWAY",
  ]

 
const sendDataToBackend = async (data) => {
  try {
    console.log(data, 'sending');
    const jsonData = data;

    const response = await axios.post('/api/call-python-function', jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const responseData = response.data; // Assuming your Flask backend returns JSON data
      console.log(responseData); // Log the response from the backend
    } else {
      throw new Error('Failed to send data to backend');
    }
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
};

  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );

}