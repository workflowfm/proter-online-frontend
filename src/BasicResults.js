import React from 'react';

class BasicResults extends React.Component {

    //Accesses the raw JSON in the props and turns it into text that the render function can then render
    renderResults = () => {
        var rawJson = this.props.rawResults
        //Below is a test line, when uncommented it will be run into the parser and the first if section is run
        //var rawJson = "{\"start\":1640693922210,\"end\":1640693922243,\"resources\":[{\"name\":\"R1\",\"costPerTick\":1.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":4.0},{\"name\":\"R2\",\"costPerTick\":2.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":8.0}],\"simulations\":[{\"name\":\"Example Name1\",\"started\":0,\"duration\":6,\"delay\":2,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"},{\"name\":\"Example Name2\",\"started\":0,\"duration\":4,\"delay\":0,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"}],\"tasks\":[{\"id\":\"dc770d6f-e49a-4b72-9fea-bdc2ae847d16\",\"task\":\"A\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":0,\"started\":0,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\", \"Dave\"],\"aborted\":false},{\"id\":\"38e4e277-3863-4e2c-a651-66d52a7626e7\",\"task\":\"A\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":0,\"started\":2,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\"],\"aborted\":false},{\"id\":\"24f0b5a9-8231-4258-84e1-bd26eba35af8\",\"task\":\"B\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":2,\"started\":2,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false},{\"id\":\"528f0c72-8ef8-4632-9889-442f8b3b40ac\",\"task\":\"B\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":4,\"started\":4,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false}]}"
        if (rawJson != null) {
            var obj = JSON.parse(rawJson)
            var timeTaken = "Simulation Complete in " + String(obj.end - obj.start) + "ms\n";
            return (
                <div>
                    {timeTaken}
                    <br></br>
                    {this.buildRecTable(obj.resources)}
                    <br></br>
                    {this.buildSimsTable(obj.simulations)}
                    <br></br>
                    {this.buildTasksTable(obj.tasks)}
                </div>
            )
        } else {
            return "NADA"
        }
        
    }

    buildRecTable = (resourcesData) => {
        const rowData = resourcesData.map(
            (info) => {
                return(
                    <tr>
                        <td>{info.name}</td>
                        <td>{info.costPerTick}</td>
                        <td>{info.idleUpdate}</td>
                        <td>{info.busyTime}</td>
                        <td>{info.idleTime}</td>
                        <td>{info.tasks}</td>
                        <td>{info.cost}</td>
                    </tr>
                )
            }
        )
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Cost Per Tick</th>
                        <th>Idle Update</th>
                        <th>Busy Time</th>
                        <th>Idle Time</th>
                        <th>Tasks</th>
                        <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        
                        {rowData}
                        
                    </tbody>
                </table>
                
            </div>
        )
    }

    buildSimsTable = (simulationData) => {
        const rowData = simulationData.map(
            (info) => {
                return(
                    <tr>
                        <td>{info.name}</td>
                        <td>{info.started}</td>
                        <td>{info.duration}</td>
                        <td>{info.delay}</td>
                        <td>{info.tasks}</td>
                        <td>{info.cost}</td>
                        <td>{info.result}</td>
                    </tr>
                )
            }
        )
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Started</th>
                        <th>Duration</th>
                        <th>Delay</th>
                        <th>Tasks Time</th>
                        <th>Cost</th>
                        <th>Results</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        
                        {rowData}
                        
                    </tbody>
                </table>
                
            </div>
        )
    }

    buildTasksTable = (taskData) => {
        const rowData = taskData.map(
            (info) => {
                return(
                    <tr>
                        <td>{info.id}</td>
                        <td>{info.task}</td>
                        <td>{info.simulation}</td>
                        <td>{this.priorityConverter(info.priority)}</td>
                        <td>{info.created}</td>
                        <td>{info.started}</td>
                        <td>{info.duration}</td>
                        <td>{info.cost}</td>
                        <td>{info.resources}</td>
                        <td>{info.aborted.toString()}</td>
                    </tr>
                )
            }
        )
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Simulation</th>
                        <th>Priority</th>
                        <th>Created</th>
                        <th>Started</th>
                        <th>Duration</th>
                        <th>Cost</th>
                        <th>Resources</th>
                        <th>Aborted?</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        
                        {rowData}
                        
                    </tbody>
                </table>
                
            </div>
        )
    }

    priorityConverter = (intPriority) => {
        switch(intPriority) {
            case 2:
                return "Highest"
                //break;
            case 1:
                return "High"
                //break;
            case 0:
                return "Medium"
                //break;
            case -1:
                return "Low"
                //break;
            case -2:
                return "Lowest"
                //break;
            default:
                return "Error"
                //break;
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