import React, { useState, useEffect} from "react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import ScaleLoader from "react-spinners/ScaleLoader";

function _sortList (content, sortBy, sortDirection) {  
    let newList = _.sortBy(content, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    // let newList = [];
    return newList;
  };

// const  _sort = ({ sortBy, sortDirection }) => {
//     const sortedList = _sortList({ sortBy, sortDirection });
//     setSortedList(sortedList);
//     //this.setState({ sortBy, sortDirection, sortedList });
//   };

function GridVirtual2 (props) {

    const [sortedList, setSortedList] = useState([]);
    const [keys, setKeys] = useState('');
    const [maxSL, setMaxSL] = useState(0);
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState({})

    useEffect(() => {
       const interval = setTimeout(() => {
        setValues(props);
        
       }, 500);
        
         return () => {
            clearInterval(interval)
         }
    }, [])

    const setValues  = (props) =>{
        setSortedList( _sortList(props.content.groups,"NUMBER",SortDirection.ASC))   
        setKeys(props.keys);
        setMaxSL(props.content.maxLength);
        setLoading(true);

        let data = props.dataFromTable;
        
          if(data !== undefined){
            for (var i=0;i<data.inputs.length;i++) {
                props.setValue('inputs['+i+']cutWidth',data.inputs[i].cutWidth);
                props.setValue('inputs['+i+']sl1',data.inputs[i].sl1);
                props.setValue('inputs['+i+']sl2',data.inputs[i].sl2);
                props.setValue('inputs['+i+']sl3',data.inputs[i].sl3);
            }
         }
        //props.setValue('inputs[0]cutWidth',0);
    }
    const validateSL = (e,value) => {

        if(e === '1'){
            if(value < maxSL){
                return 'Standard length '+e+' must be greater than ' + maxSL;
            }
        }
        // else if(e === '2' || e === '3'){
        //     if(value.length > 0){
        //         if(value < maxSL){
        //             return 'Standard length '+e+' must be greater than ' + maxSL;
        //         } 
        //     }
        // }
        return true;
      };
  

    const { id,index,register,errors} = props;
    return (
                <Grid item xs={12} md={6} id={id} style={{margin: '0px auto' , border: '1px dashed #b7b7b7'}}>
     
                                            <div key={index} className="list-group list-group-flush">
                                                    <div className="list-group-item">
                                                            <h5 className="card-title"> GRADE/DESCRIPTION:<span style={{color:'red'}}>{keys}</span></h5>
                                                                <input name={`inputs[${index}]key`} ref={register} type="hidden" value={keys}/>
                                                                 <div className="form-row">
                                                                        <div className="form-group col-3">
                                                                            <label>Cut <br/>Width</label>
                                                                            <input name={`inputs[${index}]cutWidth`} 
                                                                            type="number" 
                                                                            ref={register({ 
                                                                                    required: "Cut Width is required.", 
                                                                                    min: {
                                                                                        value : 0,
                                                                                        message : "Cut Width must be positive number"
                                                                                    } 
                                                                                })}
                                                                            className={`form-control ${errors.inputs?.[index]?.cutWidth ? 'is-invalid' : '' }`} 
                                                                            />
                                                                            {errors.inputs?.[index]?.cutWidth && <p className="errorMsg">{errors.inputs?.[index]?.cutWidth.message}</p>}
                                                                        </div>
                                                                        <div className="form-group col-3">
                                                                            <label>Standard <br/>Length 1</label>
                                                                            <input name={`inputs[${index}]sl1`} 
                                                                            type="number" 
                                                                            ref={register({ 
                                                                                    required: "Standard Length 1 is required.", 
                                                                                    min: {
                                                                                        value : 0,
                                                                                        message : "Standard Length 1 must be a positive number"
                                                                                    },
                                                                                    validate :  (value) => {
                                                                                        return validateSL('1', value)
                                                                                    }

                                                                                })}
                                                                            className={`form-control ${errors.inputs?.[index]?.sl1 ? 'is-invalid' : '' }`} 
                                                                            />
                                                                            {errors.inputs?.[index]?.sl1 && <p className="errorMsg">{errors.inputs?.[index]?.sl1.message}</p>}
                                                                        </div>
                                                                        <div className="form-group col-3">
                                                                            <label>Standard <br/>Length 2</label>
                                                                            <input name={`inputs[${index}]sl2`} 
                                                                            type="number" 
                                                                            ref={register({ 
                                                                                    min: {
                                                                                        value : 0,
                                                                                        message : "Standard Length 2 must be a positive number"
                                                                                    },
                                                                                    validate :  (value) => {
                                                                                        return validateSL('2', value)
                                                                                    }

                                                                                })}
                                                                            className={`form-control ${errors.inputs?.[index]?.sl2 ? 'is-invalid' : '' }`} 
                                                                            />
                                                                            {errors.inputs?.[index]?.sl2 && <p className="errorMsg">{errors.inputs?.[index]?.sl2.message}</p>}
                                                                        </div>
                                                                        <div className="form-group col-3">
                                                                            <label>Standard <br/>Length 3</label>
                                                                            <input name={`inputs[${index}]sl3`} 
                                                                            type="number" 
                                                                            ref={register({ 
                                                                                    min: {
                                                                                        value : 0,
                                                                                        message : "Standard Length 3 must be a positive number"
                                                                                    },
                                                                                    validate :  (value) => {
                                                                                        return validateSL('3', value)
                                                                                    }

                                                                                })}
                                                                            className={`form-control ${errors.inputs?.[index]?.sl3 ? 'is-invalid' : '' }`} 
                                                                            />
                                                                            {errors.inputs?.[index]?.sl3 && <p className="errorMsg">{errors.inputs?.[index]?.sl3.message}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                        </div>
                                                    <div style={{ height: 200, }}>
                                                        {loading ?
                                                            <AutoSizer>
                                                            {({ height, width }) => (
                                                                <Table
                                                                width={width}
                                                                height={height}
                                                                headerHeight={40}
                                                                rowHeight={30}
                                                                rowCount={sortedList.length}
                                                                rowGetter={({ index }) => sortedList[index]}
                                                                rowStyle={{alignItems: "stretch"}}
                                                                >
                                                                <Column label="Number" dataKey="NUMBER" width={150} />
                                                                <Column width={150} label="Quantity" dataKey="QUANTITY" />
                                                                <Column width={150} label="Length" dataKey="LENGTH" />
                                                                </Table>
                                                            )}
                                                            </AutoSizer>
                                                        :
                                                            <div style={{textAlign: 'center'}}>
                                                                    <div className="spinner">LOADING...</div>
                                                                    <ScaleLoader color="rgb(34, 144, 119)" loading={true} size={20} height={30} />
                                                            </div>
                                                        }
                                                    </div>  
                        
                    </Grid>
      
    );
  

  
}

// Render your table
export default GridVirtual2
