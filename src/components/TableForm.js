import React, { useState, useMemo, useCallback } from 'react';
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SortIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button"
import DynamicInputField from './DynamicInputField'



const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Directior",
    selector: "director",
    sortable: true
  },
  {
    name: "Runtime (m)",
    selector: "runtime",
    sortable: true,
    right: true
  }
];

const isIndeterminate = indeterminate => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };


const TableForm = (props) => {
 
    const [thing, setThing] = useState();
    const [openSettings, setOpenSettings] = useState(false);

    const handleAction = value => {
     console.log(value)
     setOpenSettings(!openSettings);
    };

  const columns  = useMemo(() => [
    {
      name: "NUMBER",
      selector: "NUMBER",
      sortable: true
    },
    {
      name: "QUANTITY",
      selector: "QUANTITY",
      sortable: true,
    },
    {
      name: "LENGTH",
      selector: "LENGTH",
      sortable: true,
    }
  ]);


  return (
    <>
      <h5 className="mt-2 mb-4 text-center" style={{margin:'10px',height:'auto'}}>
        <Button variant="contained" color="secondary" onClick={(value)=>{handleAction(value)}}><AddCircleOutlineIcon/>Settings</Button>
         {openSettings ? <DynamicInputField/> : ''}
      </h5>
      <div style={{display:'block'}}>
        <Card>
            <DataTable
            //title={`GRADE - ` + props.content.[0].GRADE + ` DESCRIPTION - `+ props.content.[0].DESCRIPTION}
            columns={columns}
            data={props.content}
            defaultSortField="GRADE"
            sortIcon={<SortIcon />}
            pagination
            paginationPerPage={5}
            />
        </Card>
      </div>
     
    </>
  );
};

export default TableForm;