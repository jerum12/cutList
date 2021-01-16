import React, { Fragment,Component } from 'react'
 
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import UploadExcelFileDropZone from './UploadExcelFileDropZone';

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitFile = this.handleSubmitFile.bind(this);
      }
      handleChange(files) {
        this.setState({
          files: files
        });
        console.log(files)
      }

      handleSubmitFile = (data) => {
            // setOpen(false);
            // setLoading(true);
        }
      render() {
        return (
            <div className="body" id="drop">
                 <div className="upload">
                    <div className="upload-files">
                        <header>
                        <p>
                            <CloudUploadIcon fontSize='large'/>
                            <span className="up">Cut</span>
                            <span className="load">List</span>
                        </p>
                        </header>
                
                            <UploadExcelFileDropZone handleChange={this.handleChange} />
                        <footer>
                            {  this.state.files.length > 0 ? 
                            
                                <button className="importar" onClick={this.handleSubmitFile(this.state.files)}>PROCESS FILE</button>
                            
                            : ''
                            }
                        </footer>
                    </div>
                </div>
                   
            </div>

        );
      }
}
 
export default FileUploader