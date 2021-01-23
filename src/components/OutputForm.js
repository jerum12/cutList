import React, {useEffect, useState} from "react";


function OutputForm({dataFromTable,datas}) {
    
    const [newDatas, setNewDatas] = useState([]);
    const [loading, setLoading] = useState([])
    useEffect(() => {
        const interval = setTimeout(() => {
         setValues(dataFromTable,datas);
        }, 500);
         
          return () => {
             clearInterval(interval)
          }
     }, [])

     const setValues = (dCS,dT) => {
        let newData = [];

        if(dCS !== undefined){
            for (var i=0;i<dCS.inputs.length;i++) {
                let keyValue = dCS.inputs[i].key;
                let objData = dT.filter(function(arr){return arr.key == keyValue})[0];
                let d = {...dCS.inputs[i], ...objData}
                newData.push(d);
            }
         }
         setNewDatas(newData);
     }

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