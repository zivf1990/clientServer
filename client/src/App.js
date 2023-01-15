import "./App.css";
import "./style/main.css";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import { useEffect } from "react";
import UserFiles from "./components/UserFiles";

function App() {
  return (
    <div className="App">
      <UserFiles />
      <SideBar />
      <Main />
    </div>
  );
}

export default App;
