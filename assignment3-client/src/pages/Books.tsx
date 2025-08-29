import { useGetBooksQuery } from "@/redux/api/baseApi";
import BooksShow from "./BooksShow";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(data?.data, "from books");

  return (
    <div>
      <h1>Books Component</h1>
      {isLoading ? <h3>Loading...</h3> : <BooksShow books={data?.data} />}
    </div>
  );
};

export default Books;
