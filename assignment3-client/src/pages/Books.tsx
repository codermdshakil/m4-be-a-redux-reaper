import { useGetBooksQuery } from "@/redux/api/baseApi";

const Books = () => {


  const {data, isLoading, isError} = useGetBooksQuery(undefined); 

  console.log(data, isLoading, isError, 'from books');


  return (
    <div>
      <h1>Books Component</h1>
    </div>
  );
};

export default Books;