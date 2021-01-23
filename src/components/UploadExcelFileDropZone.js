import React, { Fragment } from "react";
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
                
                minHeight : '200px'
            }
        },
        MuiDropzonePreviewList: {
            root:{
                display : 'block'
            }
        }
    }
  });

function UploadExcelFileDropZone({handleChange,files,hasError,handleBack,disabled,handleSubmitStep1,activeStep,setHasError}) {
    const classes = useStyles();
    
        return ( 
            <Fragment>
                <fieldset>
                    <h3>Upload Excel File</h3>
                    <MuiThemeProvider theme={theme}>
                        <div className={hasError === true ? "drop-zone-area" : ""}>
                            <DropzoneArea
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                initialFiles={files}
                                Icon={DescriptionIcon}
                                useChipsForPreview
                                showAlerts={false}
                                previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                                previewChipProps={{classes: { root: classes.previewChip } }}
                                previewText="Selected files"
                                acceptedFiles={['.xls','.xlsx']}
                                filesLimit={1}
                                onDrop={(droppedFiles) => {
                                    handleChange(droppedFiles)
                                    setHasError(false);
                                }}
                                onDelete={(deletedFileObject) => {
                                    handleChange('')
                                    setHasError(false);
                                }}
                            />
                        </div>
                        {hasError
                            ?
                            <p className='errorMsg' style={{maxWidth:'100%'}}>File is invalid!</p>    
                            : ''
                        }
                        
                    </MuiThemeProvider>
                </fieldset>
                
                <div className="button-class">
                    {activeStep > 0 
                        ? <button type="button"  onClick={handleBack} className="previous previous_button">Back</button>
                        : ''
                    }
                    {activeStep < 2 
                      ?  <button type="submit" disabled={disabled} onClick={handleSubmitStep1(files)} className="next action-button">Continue</button>  
                    //?  <button type="submit" disabled={disabled} className="next action-button">Continue</button>  
                        : ''
                    }

                
                </div>
            </Fragment>
        );
}
export default UploadExcelFileDropZone