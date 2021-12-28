import './App.css';
import ResourceManager from './ResourceManager';
import FlowBox from './FlowBox';
import ArrivalsBox from './ArrivalsBox';
import TaskManager from './TaskManager';

const jsonElements = []

function resourceManagerCallback(data) {
  jsonElements[0] = data;
}

function taskManagerCallback(data) {
  jsonElements[1] = data
}

function flowBoxCallback(data) {
  jsonElements[2] = data
}

function ArrivalsBoxCallback(data) {
  jsonElements[3] = data
}

function buildFinalJson() {
  return "{ \"arrival\": {\"simulation\": {\"name\": \"Example Name\", \"flow\":{ " + jsonElements[1] + ", " + jsonElements[2] + "} }, " + jsonElements[3] + "}," + jsonElements[0] + "}"
}

const resMan = <ResourceManager callback={resourceManagerCallback}/>
const taskMan = <TaskManager callback={taskManagerCallback}/>

function App() {
  return (
    <div className="App">
      {resMan}
      {taskMan}
      <FlowBox callback={flowBoxCallback}/>
      <ArrivalsBox callback={ArrivalsBoxCallback} getFullJson={buildFinalJson}/>
      <p>{jsonElements[0]}</p>
    </div>
  );
}

export default App;
