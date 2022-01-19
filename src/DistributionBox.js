import React from 'react';

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
                    Min:
                    <input name="val1" type="text" value={this.state.value2} onChange={this.handleChange}/>
                    Max:
                    <input name="val2" type="text" value={this.state.value3} onChange={this.handleChange}/>
                </div>
            )
        } else {
            return(
                <div>
                    Value:
                    <input name="val1" type="text" value={this.state.value2} onChange={this.handleChange}/>
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
        let type = "C"
        if (typeof this.state.value1 !== "undefined") {
            type = this.state.value1
        }
        let value3 = this.state.value3
        if (type === "C" || type ==="E") {
          value3 = "null"
        }
        return "{\"distType\": \"" + type + "\",\"value1\": " + this.state.value2 + ",\"value2\": " + value3 + "}";
    }
  

    render() {
        return(
        <form width="100px">
          <fieldset>
              <select name= "type" value={this.state.value1} onChange={this.handleChange}>
                <option value = "C">Constant</option>
                <option value = "E">Exponential</option>
                <option value = "U">Uniform</option>
              </select>
              {this.renderInputs()}
            </fieldset>
        </form>
        )
    }
}

export default DistributionBox
