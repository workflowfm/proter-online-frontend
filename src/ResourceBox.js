import React from 'react';
import { TextField } from '@mui/material';

class ResourceBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value1};
      this.state = {value2: this.props.value2};

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
      if (event.target.name === "name") {
        this.setState({value1: event.target.value}, this.updateJson);
      } else {
        this.setState({value2: event.target.value}, this.updateJson);
      }
    }

    updateJson() {
      const json = this.buildJson();
      this.props.callback([this.props.val, json]);
    }

    buildJson() {
      return "{\"name\": \"" + this.state.value1 + "\",\"costPerTick\": " + this.state.value2 + "}";
    }
    
    render() {
      return (
        <form width="100px">
          <fieldset>
            <legend>Resource</legend>
            <TextField sx={{mt: 2}} name="name" type="text" label="Name" value={this.state.value1} onChange={this.handleChange}/>
            <TextField sx={{mt: 2}} name="costPerTick" type="text" label="Cost Per Tick" value={this.state.value2} onChange={this.handleChange}/>
          </fieldset>
        </form>
      );
    }
  }

  export default ResourceBox;