import React, { Fragment,useEffect,useState } from "react";
import XLSX from 'xlsx';
import TableForm from './TableForm';


const ResultTable = (props) => {

    const [datas, setDatas] = useState([]);

    const groupBy = (array, f) => {
        let groups = {};
        array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
        return groups[group];
        })
    }

    useEffect(() => {
        var arrayObj = [];
        var f = props.datas[0];
        var reader = new FileReader();
        reader.onload = function (e) {
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
                  setDatas(result)
            }
        };
        reader.readAsBinaryString(f)
      }, [props.datas])

    const todos = datas.map((todo, index) => {
        return <TableForm content={todo} key={index} id={index} />
      })
    
    if(props.datas.length > 0)
        return( 
            <div className='list-wrapper'>
                {todos}
            </div>
        );
    else  
        return (<Fragment/>);
};

export default ResultTable;