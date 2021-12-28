import React from 'react';

class BasicResults extends React.Component {
    constructor(props) {
      super(props);
    }

    //Accesses the raw JSON in the props and turns it into text that the render function can then render
    renderResults = () => {
        var rawJson = this.props.rawResults
        //Below is a test line, when uncommented it will be run into the parser and the first if section is run
        var rawJson = "{\"start\":1640693922210,\"end\":1640693922243,\"resources\":[{\"name\":\"R1\",\"costPerTick\":1.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":4.0},{\"name\":\"R2\",\"costPerTick\":2.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":8.0}],\"simulations\":[{\"name\":\"Example Name1\",\"started\":0,\"duration\":6,\"delay\":2,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"},{\"name\":\"Example Name2\",\"started\":0,\"duration\":4,\"delay\":0,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"}],\"tasks\":[{\"id\":\"dc770d6f-e49a-4b72-9fea-bdc2ae847d16\",\"task\":\"A\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":0,\"started\":0,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\"],\"aborted\":false},{\"id\":\"38e4e277-3863-4e2c-a651-66d52a7626e7\",\"task\":\"A\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":0,\"started\":2,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\"],\"aborted\":false},{\"id\":\"24f0b5a9-8231-4258-84e1-bd26eba35af8\",\"task\":\"B\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":2,\"started\":2,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false},{\"id\":\"528f0c72-8ef8-4632-9889-442f8b3b40ac\",\"task\":\"B\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":4,\"started\":4,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false}]}"
        if (rawJson != null) {
            var obj = JSON.parse(rawJson)
            var timeTaken = "Simulation Complete in " + String(obj.end - obj.start) + "ms\n";
            return timeTaken
        } else {
            return "NADA"
        }
        
    }

    render() {
        return (
          <div>
              <t2>Results:</t2>
              <p>{this.renderResults()}</p>
          </div>
        );
      }
    }
  
    export default BasicResults;