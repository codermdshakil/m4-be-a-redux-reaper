import './App.css';
import { decrement, increment, incrementByFive } from './redux/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {

  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state);


  // handle increment
  const handleIncrement = () => {
    dispatch(increment())
  }

  // handle increment by 5 and with payload
  const handleIncrementByFive = (amount:number) => {
    dispatch(incrementByFive(amount))
  }



  // handle decrement
  const handleDecrement = () => {
    dispatch(decrement())
  }

  return (
    <>
    <div>
      <h3>Count : {counter.count}</h3>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={() => handleIncrementByFive(5)}>Increment by 5</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
    </>
  )
}

export default App
