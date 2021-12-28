import React from 'react';

class ArrivalsBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: this.props.value, results: "No Results"};
      this.handleChange = this.handleChange.bind(this);
      this.response = ""
    }

    handleChange(event) {
      this.setState({value: event.target.value}, this.updateJson); 
    }
    
    updateJson = () => {
      this.props.callback(this.buildJson());
    }

    buildJson = () => {
      return "\"numberOfRuns\": " + this.state.value;
    }

    handleSubmit = (event) => {
      event.preventDefault()
      var json = this.props.getFullJson()
      alert(json)
      const options = {
        method: "POST",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        }
      }

      //console.log(options)

      fetch("http://localhost:8080/API", options)
        .then(res => res.text())
        .then(text => this.setState({results: text}))
    }


    render() {
      return (
        <div>
        <form>
          <fieldset>
          <legend>Set Up Simulation</legend>
          <label>
              Number of Flows to run: 
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
              <input type="submit" value="Run Simulations" onClick={this.handleSubmit}/>
            </label>
            </fieldset>
        </form>
        <p>{this.state.results}</p>
        </div>
      );
    }
  }

  export default ArrivalsBox;