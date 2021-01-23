import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridVirtual2 from './GridVirtual2'



export default function SubmitTableForm({datas,activeStep,handleSubmitStep2,handleBack,errors,register,dataFromTable,setValue}) {

    const items = datas.map((data, index) => {
     return <GridVirtual2 content={data} 
                        keys={data.key} key={data.key} id={index}
                        index={index}
                        activeStep={activeStep}
                        handleSubmitStep2={handleSubmitStep2}
                        handleBack={handleBack}
                        errors={errors}
                        register={register}
                        dataFromTable={dataFromTable}
                        setValue={setValue}/>
    })
    
   return (
        <Grid container spacing={2}>
            {items} 
        </Grid>
    );
}