import "./App.css";
import "./style/main.css";
import SideBar from "./components/SideBar";
import UserFiles from "./components/UserFiles";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Login />
      
      <SideBar />
    </div>
  );
}

export default App;
