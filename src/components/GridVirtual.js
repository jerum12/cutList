import React, {Component, Fragment} from "react";
import TextField from '@material-ui/core/TextField';
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { TextValidator,ValidatorForm} from 'react-material-ui-form-validator';

class GridVirtual extends Component {
  constructor(props) {
    super(props);
    const sortBy = "NUMBER";
    const sortDirection = SortDirection.ASC;
    const keys= props.keys;
    const sortedList = this._sortList({ props,sortBy, sortDirection });
   
    
    this.state = {
      sortBy,
      sortDirection,
      sortedList,
      keys,
      hasSettings : false
    };


    this.handleButtonSettings.bind(this)

  }
  
 
  handleButtonSettings = () => {
    this.setState({
        hasSettings: !this.state.hasSettings
      });
  }
  

  render() {
 
    const { keys, hasSettings, sortedList } = this.state;
    const { standardLength, cutWidth, handleAddClick, handleRemoveClick, handleInputChange,helperTextCutWidth,errorCutWidth} = this.props;
    return (
        <form className="msform" onSubmit={handleSubmit((handleSubmitContinue(activeStep)))} onReset={reset}>
          <Grid item xs={12} md={6} >
                          <div style={{paddingBottom: '10px   '}}>
                              GRADE/DESCRIPTION:<span style={{color:'red'}}>{keys}</span>
                              <Tooltip title="Settings">
                                  <Button variant="contained" color="primary" 
                                  style={{float: 'right', zIndex: '10', minWidth: '5px', height: '23px', backgroundColor: '#89a597', padding: '10px',
                                  marginLeft: '10px'}}
                                  onClick={this.handleButtonSettings}>
                                    {hasSettings ? <ExpandLessIcon/> :  <SettingsIcon/> }
                                  </Button>
                              </Tooltip>
                          </div>
                          { hasSettings ?
                              <div style={{height : '80px'}}>
                                  <div style={{float: 'left', margin : '15px 0px 0px 10px'}}>

                                      {standardLength.length < 3 ?
                                          <Tooltip title="Add"><Button style={{minWidth : '40px', display:'block', padding : '0px 0px 0px 10px',backgroundColor: '#309e83'}} 
                                          variant="contained" color="primary"  onClick={handleAddClick} startIcon={<AddIcon />}
                                          />
                                          </Tooltip>
                                      :
                                          <Button style={{minWidth : '40px', display:'block', padding : '0px 0px 0px 10px'}} disabled variant="contained" color="primary" startIcon={<AddIcon />}/>
                                      
                                      }
                                      
                                      {standardLength.length === 1 ?
                                          <Button style={{minWidth : '40px', padding : '0px 0px 0px 10px'}} variant="contained" color="secondary"  disabled startIcon={<RemoveIcon />}/>
                                      :
                                      <Tooltip title="Remove"><Button style={{minWidth : '40px', padding : '0px 0px 0px 10px', backgroundColor: '#cc2e56'}} variant="contained" color="secondary"  onClick={() => handleRemoveClick(standardLength.length -1)} startIcon={<RemoveIcon />}/></Tooltip>
                                      }
                                  </div>

                                  <div style={{float:'left'}}>
                                      <TextField id="standard-number" label="CW" style={{width: '110px', padding: '5px'}}
                                          name="cutWidth"
                                          value={cutWidth}
                                          InputProps={{
                                              inputProps: { 
                                                  min: 0 
                                              }
                                          }}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          onChange={e => handleInputChange(e,keys)}
                                          helperText={helperTextCutWidth}
                                          error={errorCutWidth}
                                          type="number"
                                          required
                                      />

                                    <TextField
                                              label="Name"
                                              type="text"
                                              name="name"
                                              value=""
                                              data-validators="isRequired,isAlpha"
                                             
                                            />
                      
                           
                                      {standardLength.map((x, i) => {
                                              var idx = i + 1;
                                              
                                              return (
                                                  <TextField 
                                                      id="standard-number" label={`SL` + idx} style={{width: '110px', padding: '5px'}}
                                                      key={`SL` + idx}
                                                      value={x.standardLength}
                                                      name="standardLength"
                                                      onChange={e => handleInputChange(e,keys, i)}
                                                      type="number"
                                                      InputProps={{
                                                        inputProps: { 
                                                            min: 0 
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                      shrink: true,
                                                    }}
                                                      required
                                                      data-validators="isRequired,isNumber"
                                                  />
                                              );
                                          })}

                                      
                                  </div>
                              </div>
                              : ''
                          }
                              
                          <div style={{ height: 200 }}>
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
                          </div>                       
              </Grid>
        </form>
    );
  }

  _sortList = ({ props, sortBy, sortDirection }) => {  

    let newList = _.sortBy(props.content.groups, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    // let newList = [];
    return newList;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };
}

// Render your table
export default GridVirtual
