import React from 'react';

class TaskBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value1, value2: this.props.value2, value3: this.props.value3, value4: this.props.value4};

      this.handleChange = this.handleChange.bind(this);
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
      }
    }

    updateJson() {
      const json = this.buildJson();
      this.props.callback([this.props.val, json]);
    }

    buildJson() {
      return "{\"name\": \"" + this.state.value1 + "\",\"duration\": " + this.state.value2 + ",\"cost\": " + this.state.value3 + ",\"resources\": \"" + this.state.value4 + "\"}";
    }

    
    render() {
      return (
        <form width="100px">
          <fieldset>
          <legend>Task</legend>
          <label>
              Name: 
              <input name="name" type="text" value={this.state.value1} onChange={this.handleChange}/>
              <br />Duration:
              <input name="duration" type="text" value={this.state.value2} onChange={this.handleChange}/>
              <br />Cost:
              <input name= "cost" type="text" value={this.state.value3} onChange={this.handleChange}/>
              <br />Resources:
              <input name="resources" type="text" value={this.state.value4} onChange={this.handleChange}/>
            </label>
            </fieldset>
        </form>
      );
    }
  }

  export default TaskBox;