import React, { useState, Fragment } from 'react'
import {DropzoneDialog, DropzoneArea} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ResultTable from './ResultTable'
import ProgressBar from 'react-bootstrap/ProgressBar'
import FileUploader from './FileUploader'


const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            root:{
                backgroundColor : 'red'
            }
      }
    }
  });

  

function DropzoneDialogInput() {

    const [open, setOpen] = useState(false);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false)


    const dialogTitle = () => (
        <>
          <span>Upload Excel File</span>
          <IconButton
            style={{right: '12px', top: '8px', position: 'absolute'}}
            onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </>
      );



    const handleSubmitFile = (data) => {
        setDatas(data)
        setOpen(false);
        setLoading(true);
    }

        return (
            <Fragment>
            <MuiThemeProvider theme={theme}>
                <div className="upload">
                    <div className="upload-files">
                        <header>
                        <p>
                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                            <span className="up">up</span>
                            <span className="load">Load</span>
                        </p>
                        </header>
                
                                <FileUploader/>
               
                        <footer>
                        <div className="divider">
                  
                        </div>
                        <div className="list-files">
                        </div>
                                    <button className="importar">UPDATE FILES</button>
                        </footer>
                    </div>
                </div>

                    {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add Excel File
                    </Button> */}

                    <DropzoneDialog
                        dialogTitle={dialogTitle()}
                        acceptedFiles={['.xls','.xlsx']}
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        maxFileSize={5000000}
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={(files) => {
                            handleSubmitFile(files)
                        }}

                        showPreviews={false}
                        showPreviewsInDropzone={true}
                        showFileNamesInPreview={true}
                        filesLimit={1}
                    />

                </MuiThemeProvider>
                        
                {loading ?
                    <ResultTable datas={datas}/>
                      :
                      ''}
                    

            </Fragment>
        );
    
}


export default DropzoneDialogInput