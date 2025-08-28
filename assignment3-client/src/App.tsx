import { Outlet } from "react-router";
import "./App.css";
import Navber from "./components/layout/Navber/Navber";

function App() {
  return (
    <>
      <Navber />
      <div className="container">
        <div className="mt-[100px]">
          {/* here show all content */}
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default App;
