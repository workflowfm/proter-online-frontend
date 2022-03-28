import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const resourcesColumns = [
    {field: "name", headerName: "Name", width: 400},
    {field: "costPerTick", headerName: " Cost Per Tick", width: 175},
    {field: "idleUpdate", headerName: "Idle Update", width: 125},
    {field: "busyTime", headerName: "Busy Time", width: 125},
    {field: "idleTime", headerName: "Idle Time", width: 125},
    {field: "tasks", headerName: "Tasks", width: 100},
    {field: "cost", headerName: "Cost", width: 100}
]

const simulationColumns = [
    {field: "name", headerName: "Name", width: 400},
    {field: "started", headerName: " Time Started", width: 150},
    {field: "duration", headerName: "Duration", width: 100},
    {field: "delay", headerName: "Delay", width: 100},
    {field: "tasks", headerName: "Tasks", width: 100},
    {field: "cost", headerName: "Cost", width: 100},
    {field: "result", headerName: "Result", width: 200}
]

const taskColumns = [
    {field: "id", headerName: "ID", width: 400},
    {field: "task", headerName: " Task", width: 200},
    {field: "simulation", headerName: "Simulation", width: 200},
    {field: "priority", headerName: "Priority", width: 100},
    {field: "created", headerName: "Created", width: 100},
    {field: "started", headerName: "Started", width: 100},
    {field: "duration", headerName: "Duration", width: 100},
    {field: "cost", headerName: "Cost", width: 100},
    {field: "resources", headerName: "Resources", width: 200},
    {field: "aborted", headerName: "Aborted", width: 100}

]


class BasicResults extends React.Component {

    //Accesses the raw JSON in the props and turns it into text that the render function can then render
    renderResults = () => {
        var rawJson = this.props.rawResults
        //Below is a test line, when uncommented it will be run into the parser and the first if section is run
        //var rawJson = "{\"start\":1640693922210,\"end\":1640693922243,\"resources\":[{\"name\":\"R1\",\"costPerTick\":1.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":4.0},{\"name\":\"R2\",\"costPerTick\":2.0,\"idleUpdate\":6,\"busyTime\":4,\"idleTime\":2,\"tasks\":2,\"cost\":8.0}],\"simulations\":[{\"name\":\"Example Name1\",\"started\":0,\"duration\":6,\"delay\":2,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"},{\"name\":\"Example Name2\",\"started\":0,\"duration\":4,\"delay\":0,\"tasks\":2,\"cost\":10.0,\"result\":\"object scala.Unit\"}],\"tasks\":[{\"id\":\"dc770d6f-e49a-4b72-9fea-bdc2ae847d16\",\"task\":\"A\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":0,\"started\":0,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\"],\"aborted\":false},{\"id\":\"38e4e277-3863-4e2c-a651-66d52a7626e7\",\"task\":\"A\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":0,\"started\":2,\"duration\":2,\"cost\":4.0,\"resources\":[\"R1\"],\"aborted\":false},{\"id\":\"24f0b5a9-8231-4258-84e1-bd26eba35af8\",\"task\":\"B\",\"simulation\":\"Example Name2\",\"priority\":0,\"created\":2,\"started\":2,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false},{\"id\":\"528f0c72-8ef8-4632-9889-442f8b3b40ac\",\"task\":\"B\",\"simulation\":\"Example Name1\",\"priority\":0,\"created\":4,\"started\":4,\"duration\":2,\"cost\":6.0,\"resources\":[\"R2\"],\"aborted\":false}]}"
        if (rawJson != null) {
            var obj = JSON.parse(rawJson)
            var timeTaken = "Simulation Complete in " + String(obj.end - obj.start) + "ms\n";
            var simStats = this.calculateSimStats(obj.simulations)
            var taskStats = this.calculateTaskStats(obj.tasks)
            return (
                <div>
                    <Typography sx={{ml: 4}}>{timeTaken}</Typography>
                    <div style={{ height: 400, width: "100%"}}>
                    <Typography sx={{ml: 4}} variant="h4">Resource Statistics:</Typography>
                    <DataGrid
                        sx={{ml: 4}} 
                        rows={obj.resources}
                        columns={resourcesColumns}
                        getRowId={row => row.name}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                    />
                    </div>
                    <div style={{ height: 400, width: "100%"}}>
                    <Typography sx={{ml: 4, mt: 8}} variant="h4">Simulation Results:</Typography>
                    <DataGrid
                        sx={{ml: 4}} 
                        rows={obj.simulations}
                        columns={simulationColumns}
                        getRowId={row => row.name}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                    />
                    <div style={{marginLeft: 40}}>
                        <p>
                            Simulation Averages - Average Duration : {simStats[0].toFixed(2)} - 
                            Average Delay: {simStats[1].toFixed(2)} - 
                            Average Cost: {simStats[2].toFixed(2)}
                        </p>
                    </div>
                    </div>
                    <div style={{ height: 400, width: "100%"}}>
                    <Typography sx={{ml: 4, mt: 12}} variant="h4">Task Statistics:</Typography>
                    <DataGrid
                        sx={{ml: 4}} 
                        rows={obj.tasks}
                        columns={taskColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                    />
                    </div>
                    <div style={{marginLeft: 40}}>
                        <p>
                            Task Averages - Average Duration : {taskStats[0]} - 
                            Average Delay: {taskStats[1]} - 
                            Average Cost: {taskStats[2]}
                        </p>
                    </div>
                </div>
            )
        } else {
            return ""
        }
        
    }

    calculateSimStats = (simulationData) => {
        var durationTotal = 0
        var delayTotal = 0
        var costTotal = 0
        for (let i = 0; i < simulationData.length; i++) {
            durationTotal += simulationData[i].duration
            delayTotal += simulationData[i].delay
            costTotal+= simulationData[i].cost
        }
        return [
            durationTotal / simulationData.length,
            delayTotal / simulationData.length,
            costTotal / simulationData.length
        ]
    }

    calculateTaskStats = (taskData) => {
        var durationTotal = 0
        var delayTotal = 0
        var costTotal = 0
        for (let i = 0; i < taskData.length; i++) {
            durationTotal += taskData[i].duration
            delayTotal += taskData[i].started - taskData[i].created
            costTotal+= taskData[i].cost
        }
        return [
            durationTotal / taskData.length,
            delayTotal / taskData.length,
            costTotal / taskData.length
        ]

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
              <p>{this.renderResults()}</p>
          </div>
        );
      }
    }
  
    export default BasicResults;
