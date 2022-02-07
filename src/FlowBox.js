import { TextField } from '@mui/material';
import React from 'react';

class FlowBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: this.props.value};

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value}, this.updateJson); 
    }

    updateJson = () => {
      this.props.callback(this.buildJson());
    }

    buildJson = () => {
      return "\"ordering\": \"" + this.state.value + "\"";
    }

    
    render() {
      return (
        <form>
          <fieldset>
          <legend>Flow</legend>
          <p>Defining a flow - Enter into the box below the names of each task in order seperated with -&gt;</p>
          <TextField type="text" label="Flow" value={this.state.value} onChange={this.handleChange}/>
          </fieldset>
        </form>
      );
    }
  }

  export default FlowBox;