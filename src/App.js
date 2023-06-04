import "./App.css";
import AttributeList from "./components/AttributeList";
import ClassList from "./components/ClassList";
import SkillList from "./components/SkillList";

import { AttributeProvider } from "./contexts/AttributeContext";

// Create state and controls for each of the 6 attributes (see ATTRIBUTE_LIST) so they can be incremented/decremented independently.
function App() {
  return (
    <AttributeProvider>
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>
        <AttributeList />
        <ClassList />
        <SkillList />
      </div>
    </AttributeProvider>
  );
}

export default App;
