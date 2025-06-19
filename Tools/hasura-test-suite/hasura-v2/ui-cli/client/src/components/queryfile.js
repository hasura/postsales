import React, { useState } from 'react';
import axios from 'axios';

const GetTestQueryFiles = () => {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleGetFiles = async () => {
    try {
      const response = await axios.get('/api/get-files');
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setFileNames(data.files);
      } else {
        throw new Error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSelectFile = async (event) => {
    event.preventDefault(); // Prevent default behavior
    
    const selectedFileName = event.target.value;
  
    try {
      // Make API call to save the selected file name
      const response = await axios.post('/api/save-query-file', { fileName: selectedFileName }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Check if the API call was successful
      if (response.status === 200) {
        const data = response.data;
        console.log('API response:', data);
        
        // Update the selected file name in state
        setSelectedFileName(selectedFileName);
        
        // Handle successful response
      } else {
        // Handle error response
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      // Handle network error
      console.error('Error making API call:', error);
    }
  };
  
  
  return (
    <div className='flex flex-row gap-10'>
      <button 
      className='bg-blue-600 cursor-pointer hover:bg-blue-800 w-[200px] rounded-full px-3 py-3 text-neutral-0 ' 
      onClick={handleGetFiles}>Get Query Files</button>
      {fileNames.length > 0 && (
        <div className='flex flex-row items-center'>
          <h2 className='mr-2'>Select File:</h2>
          <select
            className='px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500'
            value={selectedFileName}
            onChange={handleSelectFile}
          >
            <option className='px-4 py-2' value="">Select a file</option>
            {fileNames.map((fileName, index) => (
              <option
                key={index}
                className='px-4 py-2'
                value={fileName}
              >
                {fileName}
              </option>
            ))}
          </select>

        </div>
      )}
    </div>
  );
};

export default GetTestQueryFiles;
