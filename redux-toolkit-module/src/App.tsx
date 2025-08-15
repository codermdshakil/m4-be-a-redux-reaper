import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, userAppSelector } from "./redux/hook";

function App() {
  
  // normal way to dispatch
  // const dispatch = useDispatch();

  // using hook to dispatch
  const dispatch = useAppDispatch();

  //  normal way 
  // const { count } = useSelector((state: RootState) => state.counter);

  // using hook
  const { count } = userAppSelector((state) => state.counter);

  // increment event handler
  const handleIncrement = () => {
    dispatch(increment());
  };

  // decrement event handler
  const handleDecrement = () => {
    dispatch(decrement());
  };
 
  return (
    <div>
      <h2>Counter with Redux</h2>
      <button onClick={handleIncrement}>Increament</button>
      <div>{count >= 0 ? count : "Less then Zero"}</div>
      <button onClick={handleDecrement}>Decreament</button>
    </div>
  );
}

export default App;
