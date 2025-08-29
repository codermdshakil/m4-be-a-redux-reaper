import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BookOpen } from "lucide-react";
import { useParams } from "react-router";

const BookDetails = () => {
  const { bookId } = useParams();

  // fetch book details
  const {
    data: book,
    isLoading,
    isError,
  } = useGetSingleBookQuery(bookId, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading book details...</p>;
  }

  if (isError || !book?.data) {
    return <p className="text-center text-red-500">Book not found.</p>;
  }

  const { title, author, genre, isbn, description, copies, available }: IBook =
    book?.data;

  return (
    <div className="max-w-3xl h-screen mx-auto mt-10">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center">
            <p className="font-semibold">Author:</p>
            <p className="ml-2 text-lg">{author}</p>
          </div>

          <div className="flex items-center">
            <p className="font-semibold">Genre:</p>
            <p className="ml-2 text-lg">{genre}</p>
          </div>

          <div className="flex items-center">
            <p className="font-semibold">ISBN:</p>
            <p className="ml-2 text-lg">{isbn}</p>
          </div>

          <div className="flex items-center">
            <p className="font-semibold">Description:</p>
            <p className="text-gray-700 ml-2 text-lg">{description}</p>
          </div>

          <div className="flex items-center">
            <p className="font-semibold ">Copies:</p>
            <p className="ml-2 text-lg">{copies}</p>
          </div>

          <div className="flex items-center">
            <p className="font-semibold">Available:</p>
            <span
              className={`px-3 ml-2 py-1 rounded-full text-sm font-medium ${
                available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
              {available ? "Yes" : "No"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;
