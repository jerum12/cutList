import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploader from './components/FileUploader'
import FileProcess from './components/FileProcess'
import DropzoneDialogInput from './components/DropzoneDialogInput'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
        {/* <FileUploader/> */}
        <FileProcess/>
        <ToastContainer autoClose={2000} limit={1}/>
        {/* <DropzoneDialogInput/> */}
    </div>
  );
}

export default App;
