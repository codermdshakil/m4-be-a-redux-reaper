import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface BooksTableProps {
  books: IBook[];
}

const BooksShow: React.FC<BooksTableProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  // delete states
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);

  const [deleteBook, { data, isLoading, isError }] = useDeleteBookMutation();

  // handle delete book
  const handleConfirmDelete = async () => {
    if (deleteBookId) {
      const data = await deleteBook(deleteBookId);

      if (isLoading) {
        toast.success("Deleting...");
      }
      
      toast.success("Successfully Deleted Book");
      // reset
      setDeleteBookId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBooks.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? "Available" : "Not Available"}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>

                {/* delete confirmation dialog */}
                <Dialog
                  open={deleteBookId === book._id}
                  onOpenChange={(open) => !open && setDeleteBookId(null)}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteBookId(book._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className="sm:max-w-[425px]"
                    aria-describedby={undefined}>
                    <AlertDialogHeader>
                      <DialogTitle className="text-2xl text-center text-red-500">
                        Are you sure?
                      </DialogTitle>
                    </AlertDialogHeader>

                    <div className="grid gap-4">
                      <DialogClose asChild>
                        <Button
                          onClick={handleConfirmDelete}
                          className="bg-green-500 hover:bg-green-600">
                          Yes, Delete
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button
                          onClick={() => setDeleteBookId(null)}
                          className="bg-red-500 hover:bg-red-600">
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>

                    <AlertDialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </AlertDialogFooter>
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="ghost" disabled={!book.available}>
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}>
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksShow;
