import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Sidebar } from './sidebar';

const LogViewer = () => {
  const [logData, setLogData] = useState('');
  const logContainerRef = useRef(null);


  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get('/api/get-log'); // Use axios.get() for GET requests
        setLogData(response.data);
      } catch (error) {
        console.error('Error fetching log:', error);
      }
    };

    const intervalId = setInterval(fetchLog, 1000); // Fetch log data every second

    // Fetch log data immediately when component mounts
    fetchLog();

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logData]); // Scroll to bottom whenever logData changes

  const scrollToBottom = () => {
    if (logContainerRef.current) {
      const bottomElement = logContainerRef.current.lastElementChild;
      if (bottomElement)
        bottomElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  return (
    <div className="flex bg-storybook-default-heading h-full w-full">
      <Sidebar />
      <div className='ml-64 mt-10  rounded-md'>
        <p className='ml-10 text-base-0'>Logs</p>
        {logData.length>0 &&
        <div className='bg-storybook-default-heading h-screen'>
        <div ref={logContainerRef} className="log-container border-2 m-10 border-neutral-0 p-4  scrollbar-hide flex flex-col-reverse overflow-y-scroll max-h-[800px]">
          <pre className='text-sm px-20 whitespace-pre-wrap text-neutral-100 font-firaCode'>{logData}</pre>
        </div>
        </div>
        }
      </div>
    </div>

  );
};

export default LogViewer;
