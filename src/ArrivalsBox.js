import React from 'react';
import BasicResults from './BasicResults';
import DistributionBox from './DistributionBox';

class ArrivalsBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value1: this.props.value, value2: this.props.value2, value3: this.props.value3, value4: this.props.value4, results: null};
      this.handleChange = this.handleChange.bind(this);
      this.distCallback = this.distCallback.bind(this);
      this.response = "";
    }

    handleChange(event) {
      if (event.target.name === "infinite") {
        this.setState({value1: event.target.checked}, this.updateJson);
      } else if (event.target.name === "simulationLimit") {
        this.setState({value2: event.target.value}, this.updateJson);
      } else if (event.target.name === "timeLimit") {
        this.setState({value3: event.target.value}, this.updateJson);    
      }
    }
    
    updateJson = () => {
      this.props.callback(this.buildJson());
    }

    buildJson = () => {
      let checked = false
        if (typeof this.state.value1 !== "undefined") {
            checked = this.state.value1
        }
      return "\"infinite\": " + checked + ",\"rate\": " + this.state.value4 + ",\"simulationLimit\": " + this.state.value2 + ",\"timeLimit\": " + this.state.value3;
    }

    distCallback(data) {
      this.setState({value4: data[1]}, this.updateJson);
    }

    handleSubmit = (event) => {
      event.preventDefault();
      var json = this.props.getFullJson();
      alert(json);
      const options = {
        method: "POST",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      //console.log(options)

      fetch("http://localhost:8080/API", options)
        .then(res => res.text())
        .then(text => this.setState({results: text}));
    }


    render() {
      return (
        <div>
          <form>
            <fieldset>
            <legend>Arrival</legend>
            <label>
                The arrival determines how often simulations will be started<br/>
                Infinite Arrivals?
                <input name="infinite" type="checkbox" value={this.state.value1} onChange={this.handleChange}/>
                <br></br>Rate:
                <DistributionBox id="1" callback={this.distCallback}/>
                {!this.state.value1 //This section displays the correct limit depending on whether or not the user has selected an infinite arrival
                  ? <div>Simulation Limit:
                  <input name="simulationLimit" type="text" value={this.state.value2} onChange={this.handleChange}/></div>
                  : <div>Time Limit:
                  <input name="timeLimit" type="text" value={this.state.value3} onChange={this.handleChange}/></div>
                }
                <input type="submit" value="Run Simulations" onClick={this.handleSubmit}/>
              </label>
              </fieldset>
          </form>
          <BasicResults rawResults={this.state.results}/>
        </div>
      );
    }
  }

  export default ArrivalsBox;