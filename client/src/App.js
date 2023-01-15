import "./App.css";
import "./style/main.css";
import SideBar from "./components/SideBar";
import { useEffect } from "react";
import UserFiles from "./components/UserFiles";

function App() {
  return (
    <div className="App">
      <UserFiles />
      <SideBar />
    </div>
  );
}

export default App;
