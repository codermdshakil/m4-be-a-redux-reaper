import { useDispatch, } from "react-redux";
import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";

function App() {

  const dispatch = useDispatch();
  // const counter = useSelector();




  // increment event handler
  const handleIncrement = () => {
    dispatch(increment())
  }


  // decrement event handler
  const handleDecrement = () => {
    dispatch(decrement())
  }

  return (
    <div>
      <h2>Counter with Redux</h2>
      <button onClick={handleIncrement}>Increament</button>
      <div>0</div>
      <button onClick={handleDecrement}>Decreament</button>
    </div>
  );
}

export default App;
