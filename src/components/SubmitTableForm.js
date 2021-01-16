import React from "react";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import DescriptionIcon from '@material-ui/icons/Description';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => createStyles({
  previewChip: {
    minWidth: 160
  },
}));


const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            root:{
                border : 'none',
                minHeight : '100px'
            }
        },
        MuiDropzonePreviewList: {
            root:{
                display : 'block'
            }
        }
    }
  });

function SubmitTableForm({datas}) {
    const classes = useStyles();
    console.log("datas",datas)
        return ( 
            <fieldset>
            <h3>Verify Your Identity</h3>
            <h6>Please upload any of these documents to verify your Identity.</h6>
            <div className="passport">
                <h4>Govt. ID card <br/>PassPort <br/>Driving License.</h4> 
            </div>
            <div className="input-group"> 
                <div className="custom-file">
                <input type="file" className="custom-file-input" id="upload"/>
                <label className="custom-file-label" ><i className="ion-android-cloud-outline"></i>Choose file</label>
                </div>
            </div>
            <ul className="file_added">
                <li>File Added:</li>
                <li><a href="#"><i className="ion-paperclip"></i>national_id_card.png</a></li>
                <li><a href="#"><i className="ion-paperclip"></i>national_id_card_back.png</a></li>
            </ul>
        </fieldset> 
            
        );
}
export default SubmitTableForm