import React, { useState,Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        verticalAlign : 'baseline'
      },
    },
  }));

function DynamicInputField() {

  const classes = useStyles();
  const [standardLength, setStandardLength] = useState([{ standardLength: "" }]);
  const [cutWidth, setCutWidth] = useState();
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if(name === "cutWidth"){
        setCutWidth(value)
    }else{
        const list = [...standardLength];
        list[index][name] = value;
        setStandardLength(list);
    }
 
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...standardLength];
    list.splice(index, 1);
    setStandardLength(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {

    console.log(standardLength.length)
    setStandardLength([...standardLength, { standardLength: ""}]);
  };
 
  return (
    <form className={classes.root} noValidate autoComplete="off" style={{display: 'inline'}}>
        <TextField id="outlined-basic" label="Cut Width" variant="outlined"
                name="cutWidth"
                value={cutWidth}
                onChange={e => handleInputChange(e)}
                type="number"
            />
                {standardLength.length < 3 ?
                    <Tooltip title="ADD"><Button style={{marginLeft : '10px', width : '0%'}} variant="contained" color="primary"  onClick={handleAddClick} startIcon={<AddIcon />}/>
                    </Tooltip>
                  :
                    <Tooltip title="ADD"><Button style={{marginLeft : '10px', width : '0%'}} disabled variant="contained" color="primary"  onClick={handleAddClick} startIcon={<AddIcon />}/>
                    </Tooltip>
                }
      {standardLength.map((x, i) => {
          var idx = i + 1;
        return (
                <Fragment>
                      
                    <TextField id="outlined-basic" label={`Standard Length` + idx} variant="outlined"
                        name="standardLength"
                        value={x.standardLength}
                        onChange={e => handleInputChange(e, i)}
                        type="number"
                    />

                <div className="btn-box" style={{display: 'inline'}}>
                {standardLength.length !== 1 && 
                     <Tooltip title="REMOVE"><Button variant="contained" color="secondary"  onClick={() => handleRemoveClick(i)} startIcon={<RemoveIcon />}/></Tooltip>
                }
               
                </div>
            </Fragment>
        );
      })}
            
    </form>
  );
}
 
export default DynamicInputField;