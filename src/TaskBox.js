import { TextField, Select, MenuItem } from '@mui/material';
import React from 'react';
import DistributionBox from './DistributionBox';

class TaskBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value1, value2: this.props.value2, value3: this.props.value3, value4: this.props.value4, value5: this.props.value5};

      this.handleChange = this.handleChange.bind(this);
      this.distCallback = this.distCallback.bind(this);
    }

    handleChange(event) {
      if (event.target.name === "name") {
        this.setState({value1: event.target.value}, this.updateJson);
      } else if (event.target.name === "duration") {
        this.setState({value2: event.target.value}, this.updateJson);
      } else if (event.target.name === "cost") {
        this.setState({value3: event.target.value}, this.updateJson);
      } else if (event.target.name === "resources") {
        this.setState({value4: event.target.value}, this.updateJson);
      } else if (event.target.name === "priority") {
        this.setState({value5: event.target.value}, this.updateJson);
      }
    }

    updateJson() {
      const json = this.buildJson();
      this.props.callback([this.props.val, json]);
    }

    buildJson() {
      return "{\"name\": \"" + this.state.value1 + "\",\"duration\": " + this.state.value2 + ",\"cost\": " + this.state.value3 + ",\"resources\": \"" + this.state.value4 + "\",\"priority\": " + this.state.value5 + "}";
    }

    distCallback(data) {
      if (data[0] === "1") {
        this.setState({value2: data[1]}, this.updateJson);
      } else {
        this.setState({value3: data[1]}, this.updateJson);
      }
    }
    
    render() {
      return (
        <form width="100px">
          <fieldset>
              <legend>Task</legend>
              <TextField sx={{mt: 1}} name="name" label="Name" type="text" value={this.state.value1} onChange={this.handleChange}/>
              <hr />
              Duration:
              <DistributionBox id="1" value1="C" callback={this.distCallback}/>
              <hr />
              Cost:
              <DistributionBox id="2" value1="C" callback={this.distCallback}/>
              <hr />
              Priority:<br></br>
              <Select name= "priority" value={this.state.value5} onChange={this.handleChange}>
              <MenuItem disabled value="">
                  <em>Priority</em>
                </MenuItem>
                <MenuItem value = "2">Highest</MenuItem>
                <MenuItem value = "1">High</MenuItem>
                <MenuItem value = "0">Medium</MenuItem>
                <MenuItem value = "-1">Low</MenuItem>
                <MenuItem value = "-2">Lowest</MenuItem>
              </Select>
              <hr />
              <TextField sx={{mt: 1}} name="resources" label="Resources" type="text" value={this.state.value4} onChange={this.handleChange}/>
            </fieldset>
        </form>
      );
    }
  }

  export default TaskBox;