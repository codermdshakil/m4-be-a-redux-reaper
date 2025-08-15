import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import type { RootState } from "./redux/store";

function App() {

  const dispatch = useDispatch();
  const {count} = useSelector((state:RootState) => state.counter)
 




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
      <div>{count}</div>
      <button onClick={handleDecrement}>Decreament</button>
    </div>
  );
}

export default App;
