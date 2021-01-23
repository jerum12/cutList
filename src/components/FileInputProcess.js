import React, { Fragment, useState } from 'react'
 
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import TableChartIcon from '@material-ui/icons/TableChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import clsx from 'clsx';
// import { toast, Flip } from 'react-toastify';
import * as XLSX from 'xlsx';


import UploadExcelFileDropZone from './UploadExcelFileDropZone' ;
import OutputForm from './OutputForm';
import SubmitTableForm from './SubmitTableForm'
import { useForm } from "react-hook-form";

import {processInputs} from '../util/Utility'

function getSteps() {
    return ['Upload Excel File', 'Submit Form', 'Output'];
}

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(77 182 172) 0%, rgb(64 233 186) 50%, rgb(35 71 138) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(77 182 172) 0%, rgb(64 233 186) 50%, rgb(35 71 138) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#000',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(77 182 172) 0%, rgb(64 233 186) 50%, rgb(35 71 138) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(77 182 172) 0%, rgb(64 233 186) 50%, rgb(35 71 138) 100%)',
    },
  });
  
  
function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <DescriptionIcon />,
      2: <TableChartIcon />,
      3: <BarChartIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

const FileInputProcess = () => {
    
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [disabled, setDisabled] = useState(true);
    const [files, setFiles] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [datas, setDatas] = useState([]);
    const [dataFromTable, setDataFromTable] = useState();

    // for Groupings
    const groupBy = (array, f) => {
        let groups = {};
        let count = 1;
        array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
        });
       

        return Object.keys(groups).map(function (group) {
            let keys = JSON.parse(group);
            let maxLength = Math.max.apply(Math, groups[group].map(function(o) { return o.LENGTH; }));
            let map = {key: keys[0] + " - " + keys[1], groups: groups[group], maxLength : maxLength, count : count++};
        return map;
        })
    }


    // FOR STEP 1
    const handleChange = (files) => {
      setDataFromTable()
        setFiles(files)
        if(files.length > 0)
            setDisabled(false);
        else
            setDisabled(true);
    }

    const handleSubmitStep1 = (file) => e =>  {
      
      e.preventDefault();
      setDataFromTable()
          var files = file[0];
              var reader = new FileReader();
              reader.onload = function (e) {
                  var arrayObj = [];
                  var data = e.target.result;
                  let readedData = XLSX.read(data, {type: 'binary'});
                  const wsname = readedData.SheetNames[0];
                  const ws = readedData.Sheets[wsname];
          
                  /* Convert array to json*/
                  const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
                  if(dataParse.length > 0){
                      var headerPart = dataParse[0][0];
                      var headerGrade = dataParse[0][1];
                      var headerDesc = dataParse[0][2];
                      var headerQty = dataParse[0][3];
                      var headerLength = dataParse[0][4];
                      var hasError2 = false;

                      if(String(headerPart).toUpperCase() !== "NUMBER")
                          hasError2 = true;
                      else if(String(headerGrade).toUpperCase() !== "GRADE")
                          hasError2 = true;
                      else if(String(headerDesc).toUpperCase() !== "DESCRIPTION")
                          hasError2 = true;
                      else if(String(headerQty).toUpperCase() !== "QUANTITY")
                          hasError2 = true;
                      else if(String(headerLength).toUpperCase() !== "LENGTH")
                          hasError2 = true;

                      if(hasError2 === true){                    
                          // toast.error("Uploaded File is Invalid!", {
                          //     position: toast.POSITION.TOP_CENTER,
                          //     transition: Flip,
                          //     className: 'error-toast',
                          //     hideProgressBar: true
                          // });
                          setHasError(true)
                      }else{
                          for(var i=1; i< dataParse.length;i++){
                              var jsonData = {};
          
                              jsonData[headerPart] = dataParse[i][0];
                              jsonData[headerGrade] = dataParse[i][1];
                              jsonData[headerDesc] = dataParse[i][2];
                              jsonData[headerQty] = dataParse[i][3];
                              jsonData[headerLength] = dataParse[i][4];
          
                              arrayObj.push(jsonData)
                          }
                          var result = groupBy(arrayObj, function (item) {
                              return [item.GRADE, item.DESCRIPTION];
                          });
                          setDatas(result);
                          setActiveStep((prevActiveStep) => prevActiveStep + 1);
                          setHasError(false)
                      }

                  
                  }else{
                      setHasError(true)
                      // toast.error("Uploaded File is Invalid!", {
                      //     position: toast.POSITION.TOP_CENTER,
                      //     transition: Flip,
                      //     className: 'error-toast',
                      //     hideProgressBar: true
                      // });
                  }
              };
              reader.readAsBinaryString(files);
      
  };

    //END

    
    //FOR STEP 2
    const handleSubmitStep2 = (dataFromCSL) =>{

      processInputs(dataFromCSL,datas)


        // setDataFromTable(data)
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

 
    //END

    //FOR STEP 3
    const handleSubmitStep3 = (data) =>{
      setDataFromTable()
      setFiles([])
      setDisabled(true)
      setActiveStep(0);
      setHasError(false)
      setDatas([])
    }
    //END

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  


    // form validation rules 
//    const validationSchema = Yup.object().shape({
//         inputs: Yup.array().of(
//             Yup.object().shape({
//                 cutWidth: Yup.number()
//                     .required('Cut Width is required')
//                     .positive().integer()
//                     .min,
//                 sl1: Yup.number()
//                     .required('Standard Length 1 is required')
//                     .positive().integer(),
//                 sl2: Yup.number()
//                     .required('Standard Length 2 is required')
//                     .positive().integer(),
//                 sl3: Yup.number()
//                     .required('Standard Length 3 is required')
//                     .positive().integer()
//             })
//         )
//     });

    // functions to build form returned by useForm() hook
    // const { register, handleSubmit, reset, errors, watch } = useForm({
    //     resolver: yupResolver(validationSchema)
    // });

    const { register, handleSubmit, errors, setValue } = useForm();


        return (
            
            <div className="upload">

                    <div className="upload-files">
                        <header>
                        <p>
                            <CloudUploadIcon fontSize='large'/>
                            <span className="up">Cut</span>
                            <span className="load">List</span>
                        </p>
                        </header>

                        <section className="multi_step_form">  
                        <div className="msform">
                          
                              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                  {steps.map((label) => (
                                  <Step key={label}>
                                      <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                  </Step>
                                  ))}
                              </Stepper>


                              {/* {getStepContent(activeStep)} */}
                              {activeStep === 0 ?
                                  <UploadExcelFileDropZone 
                                    handleChange={handleChange} 
                                    files={files} 
                                    hasError={hasError}
                                    handleSubmitStep1={handleSubmitStep1}
                                    handleBack={handleBack}
                                    disabled={disabled}
                                    activeStep={activeStep}
                                    setHasError={setHasError}
                                  />
                                  : activeStep === 1 ?

                                          <form onSubmit={handleSubmit(handleSubmitStep2)}>
                                                <SubmitTableForm datas={datas} register={register} errors={errors}
                                                dataFromTable={dataFromTable}
                                                setValue={setValue}/>

                                                    <div className="button-class">
                                                         <button type="button"  onClick={handleBack} className="previous previous_button">Back</button>
                                                         <button type="submit" className="next action-button">Continue</button> 
                                                    </div>
                                            </form>
                                  
                                  : activeStep === 2 ?
                                      <Fragment>
                                        <OutputForm dataFromTable={dataFromTable} datas={datas}/>
                                        <div className="button-class">
                                            <button type="button"  onClick={handleBack} className="previous previous_button">Back</button>
                                            <button type="button" onClick={handleSubmitStep3} className="next action-button">DONE</button>  
                                      </div>
                                    </Fragment>              
                                  : ''
                              }

                              {/* </FormControl> */}
                              </div>  
                            {/* </MaterialUIForm> */}
                        </section>  
                    </div>

            </div>



        );
      
}
 
export default FileInputProcess