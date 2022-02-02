import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

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
          <label>
              Name: 
              <input name="name" type="text" value={this.state.value1} onChange={this.handleChange}/>
              
              <Tooltip
                placement="right"
                trigger='click'
                overlay="This is the constant cost of a resource per time unit. Think the salary of an employee or running cost of a machine"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
              >
              <div>
                <br/>Cost Per Tick: [?]
                <input name="costPerTick" type="text" value={this.state.value2} onChange={this.handleChange}/>
              </div>
              </Tooltip>

            </label>
            </fieldset>
        </form>
      );
    }
  }

  export default ResourceBox;