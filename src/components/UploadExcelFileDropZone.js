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

function UploadExcelFileDropZone({handleChange,files,hasError}) {
    const classes = useStyles();
    
        return ( 
            <fieldset>
                <h3>Upload Excel File</h3>
                <MuiThemeProvider theme={theme}>
                    <div className={hasError == true ? "drop-zone-area" : ""}>
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
                            }}
                            onDelete={(deletedFileObject) => {
                                handleChange('')
                            }}
                        />
                    </div>
                </MuiThemeProvider>
            </fieldset>
            
        );
}
export default UploadExcelFileDropZone