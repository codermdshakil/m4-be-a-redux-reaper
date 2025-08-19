import { Outlet } from "react-router";
import Navber from "./components/layout/Navber";

function App() {
  return (
    <div>
      <Navber />
      <div className="w-5/6 mx-auto py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
