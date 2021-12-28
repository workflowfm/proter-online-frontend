import React from 'react';
import ResourceBox from './ResourceBox';

class ResourceManager extends React.Component {
    constructor(props) {
      super(props);
      this.output = <ResourceBox key="0" val="0" callback={this.callbackFunction}/>
      this.state = {value: 1, jsonValues : []};
      this.jsonValues = new Map() //Contains the json values for each of its subcomponents (ResourceBoxes), with the subcompnents ID as the first element of a sub array

      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
        if (!isNaN(event.target.value) && Number(event.target.value) !== 0) {
            var n = Math.abs(Math.round(Number(event.target.value)));
            this.output = []

            for(var i =0; i<n;i++) {
              this.output.push(<ResourceBox key={i} val={i} callback={this.callbackFunction}/>)
            }

            this.jsonValues = new Map() //Code to correctly clear the map needs to be better written
        }
    }

    callbackFunction = childData => { //Wouldn't bind properly so had to use this
      this.jsonValues.set(childData[0], childData[1])
      this.props.callback(this.buildJson())
    }

    buildJson = () => {
      var json = "\"resources\": [";
      this.jsonValues.forEach (function(value, key) {
        json += value + ",";
      })
      json = json.slice(0, -1) //Check this I dont think its working
      json += "]"
      return json;
    }

    render() {
      return (
          <form width="100px">
          <fieldset>
          <legend>Resources</legend>
          <p>Please enter below the number of resources you need to define</p>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> <br />
          {this.output}        
          </fieldset>
          </form>
      );
    }
  }

export default ResourceManager;