const logger = (state) => (next) => (action) => {

  console.group(action.type);
  console.info("Prev Step",state.getState());
  const result = next(action);
  console.info("Next Step",state.getState());
  console.groupEnd();
  return result;  
}

export default logger;
 