import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    ipcRenderer.send('read-file', 'home.txt');
    ipcRenderer.on('file-content', (event, fileContent) => {
      try {
        const jsonContent = JSON.parse(fileContent);
        if (jsonContent.length > 0 && jsonContent[0].pairNumber) {
          setContent(jsonContent[0].pairNumber.toString());
        } else {
          setContent('No pairNumber found');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setContent('Error parsing JSON');
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('file-content');
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a sample Electron app with React and React Router.</p>
      <h2>Content from home.txt:</h2>
      <pre>{content}</pre>
    </div>
  );
}

export default Home;