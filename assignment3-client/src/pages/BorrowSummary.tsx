import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading borrow summary...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">Failed to load borrow summary</p>
      </div>
    );

  return (
    <div className="p-6 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Borrowed Books Summary
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                ISBN
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Total Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-6 text-sm text-gray-800">{item.book.title}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{item.book.isbn}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
