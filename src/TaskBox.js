import React from 'react';

class TaskBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value1, value2: this.props.value2, value3: this.props.value3, value4: this.props.value4, value5: this.props.value5};

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

    
    render() {
      return (
        <form width="100px">
          <fieldset>
              <legend>Task</legend>
              Name: 
              <input name="name" type="text" value={this.state.value1} onChange={this.handleChange}/>
              <br />Duration:
              <input name="duration" type="text" value={this.state.value2} onChange={this.handleChange}/>
              <br />Cost:
              <input name= "cost" type="text" value={this.state.value3} onChange={this.handleChange}/>
              <br />Priority: 
              <select name= "priority" value={this.state.value5} onChange={this.handleChange}>
                <option value = "2">Highest</option>
                <option value = "1">High</option>
                <option value = "0">Medium</option>
                <option value = "-1">Low</option>
                <option value = "-2">Lowest</option>
              </select>
              <br />Resources:
              <input name="resources" type="text" value={this.state.value4} onChange={this.handleChange}/>
            </fieldset>
        </form>
      );
    }
  }

  export default TaskBox;