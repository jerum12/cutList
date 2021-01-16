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

function OutputForm({handleChange}) {
    const classes = useStyles();
        return ( 
            <fieldset>
                    <h3>Create Security Questions</h3>
                    <h6>Please update your account with security questions</h6> 
                    <div className="form-group"> 
                        <select className="product_select">
                        <option data-display="1. Choose A Question">1. Choose A Question</option> 
                        <option>2. Choose A Question</option>
                        <option>3. Choose A Question</option> 
                        </select>
                    </div> 
                    <div className="form-group fg_2"> 
                        <input type="text" className="form-control" placeholder="Anwser here:"/>
                    </div> 
                    <div className="form-group"> 
                        <select className="product_select">
                        <option data-display="1. Choose A Question">1. Choose A Question</option> 
                        <option>2. Choose A Question</option>
                        <option>3. Choose A Question</option> 
                        </select>
                    </div> 
                    <div className="form-group fg_3"> 
                        <input type="text" className="form-control" placeholder="Anwser here:"/>
                    </div> 
            </fieldset>  
            
        );
}
export default OutputForm