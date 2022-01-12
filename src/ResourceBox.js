import React from 'react';
import DistributionBox from './DistributionBox';

class ResourceBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value1};
      this.state = {value2: this.props.value2};

      this.distCallback = this.distCallback.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
      if (event.target.name === "name") {
        this.setState({value1: event.target.value}, this.updateJson);
      }
    }

    updateJson() {
      const json = this.buildJson();
      this.props.callback([this.props.val, json]);
    }

    buildJson() {
      return "{\"name\": \"" + this.state.value1 + "\",\"costPerTick\": " + this.state.value2 + "}";
    }

    distCallback(data) {
      this.setState({value2: data[1]}, this.updateJson);
    }
    
    render() {
      return (
        <form width="100px">
          <fieldset>
          <legend>Resource</legend>
          <label>
              Name: 
              <input name="name" type="text" value={this.state.value1} onChange={this.handleChange}/>
              <br />Cost Per Tick:
              <DistributionBox id="1" callback={this.distCallback}/>
            </label>
            </fieldset>
        </form>
      );
    }
  }

  export default ResourceBox;