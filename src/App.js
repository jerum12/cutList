import React from 'react';
import './App.css';
import FileInputProcess from './components/FileInputProcess'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
        {/* <FileUploader/> */}
        <FileInputProcess/>
        <ToastContainer autoClose={2000} limit={1}/>
        {/* <DropzoneDialogInput/> */}
    </div>
  );
}

export default App;
