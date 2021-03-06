import React from 'react';
import BasicResults from './BasicResults';
import DistributionBox from './DistributionBox';
import { Checkbox, TextField, Tooltip, Button } from '@mui/material';


class ArrivalsBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value1: this.props.value,
        value2: this.props.value2,
        value3: this.props.value3,
        value4: this.props.value4,
        results: null,
        mode: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.distCallback = this.distCallback.bind(this);
      this.resultRender = this.resultRender.bind(this);
      this.response = "";
    }

    handleChange(event) {
      if (event.target.name === "infinite") {
        this.setState({value1: event.target.checked}, this.updateJson);
      } else if (event.target.name === "simulationLimit") {
        this.setState({value2: event.target.value}, this.updateJson);
      } else if (event.target.name === "timeLimit") {
        this.setState({value3: event.target.value}, this.updateJson);    
      } else if (event.target.name === "mode") {
        this.setState({mode: !this.state.mode});
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
      let simLim = "null"
      if (typeof this.state.value2 !== "undefined") {
          simLim = this.state.value2
      }
      let timLim = "null"
      if (typeof this.state.value3 !== "undefined") {
          timLim = this.state.value3
      }
      return "\"infinite\": " + checked + ",\"rate\": " + this.state.value4 + ",\"simulationLimit\": " + simLim + ",\"timeLimit\": " + timLim;
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
      let uri = ""

      if (this.state.mode === true) {
        uri = "http://127.0.0.1:8080/stream"
      } else {
        uri = "http://127.0.0.1:8080/API"
      }

      fetch(uri, options)
        .then(res => {
          if (res.status !== 200) {
            return false;
          } else {
            return res.text()
          }
        })
        .then(text => this.setState({results: text}));
    }

    resultRender = () => {
      if(this.state.mode === true) {
        return (
          <p>{this.state.results}</p>
        )
      } else {
        return (
          <BasicResults rawResults={this.state.results}/>
        )
      }
    }


    render() {
      return (
        <div>
          <form>
            <fieldset>
            <legend>Arrival</legend>
                The arrival determines how often simulations will be started<br/>
                <Tooltip placement="right" title="Infinite arrivals means simulations will keep starting as per the arrival rate until the set time limit runs out">
                  <label>Infinite Arrivals?
                  <Checkbox name="infinite" value={this.state.value1} onChange={this.handleChange}/></label>
                </Tooltip>
                <hr />
                Arrival Rate:
                <DistributionBox id="1" value1="C" callback={this.distCallback}/>
                <hr />
                {!this.state.value1 //This section displays the correct limit depending on whether or not the user has selected an infinite arrival
                  ? <div>
                  <TextField sx={{mt: 2}} name="simulationLimit" label="Simulation Limit" value={this.state.value2} onChange={this.handleChange}/></div>
                  : <div>
                  <TextField sx={{mt: 2}} name="timeLimit" label="Time Limit" value={this.state.value3} onChange={this.handleChange}/></div>
                }

                <Button sx={{mt:2}} variant="contained" onClick={this.handleSubmit}>Run Simulations</Button>
                <label>Streaming Response
                <Checkbox name="mode" value={this.state.mode} onChange={this.handleChange}/></label>

              </fieldset>
          </form>
          
          {this.resultRender()}
          
        </div>
      );
    }
  }
	//<BasicResults rawResults={this.state.results}/>
	//{this.state.results}
  export default ArrivalsBox;
