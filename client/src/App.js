import "./App.css";
import "./style/main.css";
import SideBar from "./components/SideBar";
import UserFiles from "./components/UserFiles";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import ItemPathProvider from "./context/ItemPathContext";

function App() {
  return (
    <ItemPathProvider>
      <div className="App">
        <Navigation />
      </div>
    </ItemPathProvider>
  );
}

export default App;
