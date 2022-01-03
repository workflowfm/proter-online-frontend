import React from 'react';
import TaskBox from './TaskBox';

class TaskManager extends React.Component {
    constructor(props) {
      super(props);
      this.output = <TaskBox key="0" val="0" value5="0" callback={this.callbackFunction}/>
      this.state = {value: 1};
      this.jsonValues = new Map()

      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
        if (!isNaN(event.target.value) && Number(event.target.value) !== 0) {
            var n = Math.abs(Math.round(Number(event.target.value)));
            this.output = []

            for(var i =0; i<n;i++) {
              this.output.push(<TaskBox key={i} val={i} value5="0" callback={this.callbackFunction}/>)
            }

            this.jsonValues = new Map() //Code to correctly clear the map needs to be better written
        }
    }

    callbackFunction = childData => { //Wouldn't bind properly so had to use this
      this.jsonValues.set(childData[0], childData[1])
      this.props.callback(this.buildJson())
    }

    buildJson = () => {
      var json = "\"tasks\": [";
      this.jsonValues.forEach (function(value, key) {
        json += value + ",";
      })
      json = json.slice(0,-1)
      json += "]"
      return json;
    }

    render() {
      return (
          <form width="100px">
          <fieldset>
          <legend>Tasks</legend>
          <p>Please enter below the number of tasks you need to define</p>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> <br />
          {this.output}        
          </fieldset>
          </form>
      );
    }
  }

  export default TaskManager;