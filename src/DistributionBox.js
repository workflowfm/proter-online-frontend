import React from 'react';
import Box from '@mui/material/Box';
import { Card, MenuItem, Select, TextField, InputLabel } from '@mui/material';

//Should pass the default value of the distribution type (value1)
class DistributionBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {value1: this.props.value1, value2: this.props.value2, value3: this.props.value3};
        this.handleChange = this.handleChange.bind(this);
    }

    renderInputs = () => {
        if (this.state.value1 === "U") {
            return(
                <div>
                    <TextField sx={{mt: 2}} variant="outlined" label="Minimum" name="val1" value={this.state.value2} onChange={this.handleChange}/>
                    <TextField sx={{mt: 2}} variant="outlined" label="Maximum" name="val2" value={this.state.value3} onChange={this.handleChange}/>
                </div>
            )
        } else {
            return(
                <div>
                    <TextField sx={{mt: 2}} name="val1" variant="outlined" label="Value" value={this.state.value2} onChange={this.handleChange}/>
                </div>
            )
        }
    }

    handleChange(event) {
        if (event.target.name === "type") {
          this.setState({value1: event.target.value}, this.updateJson);
        } else if (event.target.name === "val1") {
          this.setState({value2: event.target.value}, this.updateJson);
        } else if (event.target.name === "val2") {
          this.setState({value3: event.target.value}, this.updateJson);
        } 
      }

    updateJson = () => {
      const json = this.buildJson();
      console.log(json)
      this.props.callback([this.props.id, json]);
    }

    buildJson = () => {
        let value3 = this.state.value3
        if (this.state.value1 !== "U") {
          value3 = "null"
        }
        return "{\"distType\": \"" + this.state.value1 + "\",\"value1\": " + this.state.value2 + ",\"value2\": " + value3 + "}";
    }
  

    render() {
        return(
          <Box>
            <Card>
              <Select sx={{mt: 2}} name="type" id="type" label="Type" value={this.state.value1} onChange={this.handleChange}>
                <MenuItem disabled value="">
                  <em>Type</em>
                </MenuItem>
                <MenuItem value = "C">Constant</MenuItem>
                <MenuItem value = "E">Exponential</MenuItem>
                <MenuItem value = "U">Uniform</MenuItem>
              </Select>
              {this.renderInputs()}
            </Card>
          </Box>
        )
    }
}

export default DistributionBox
