import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useUpdateSingleBookMutation,
} from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { format } from "date-fns";
import { BookOpen, CalendarIcon, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

interface BooksTableProps {
  books: IBook[];
}

const BooksShow: React.FC<BooksTableProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Delete states
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [deleteBook] = useDeleteBookMutation();

  const handleConfirmDelete = async () => {
    if (deleteBookId) {
      await deleteBook(deleteBookId);
      toast.success("Book deleted successfully");
      setDeleteBookId(null);
    }
  };

  // Update states
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [updateSingleBook] = useUpdateSingleBookMutation();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 0,
      description: "",
      available: true,
    },
  });

  // handle pre-fill form with book data
  const handleOpenUpdate = (book: IBook) => {
    setSelectedBook(book);
    form.reset(book);
    setOpen(true);
  };

  // handle onsubmit with updated data
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (selectedBook) {
      const updatedBook = { ...selectedBook, ...data };
      handleUpdateBook(updatedBook);
      setOpen(false);
    }
  };

  // handle update book form
  const handleUpdateBook = async (book: IBook) => {
    try {
      // here call updatedBook baseApi functions
      await updateSingleBook({
        bookId: book._id,
        updatedData: book,
      }).unwrap();

      // Success toast
      toast.success("Book updated successfully");
    } catch (error: any) {
      console.error("Update failed:", error);

      // Error toast
      toast.error(error?.data?.message || "Failed to update book");
    }
  };

  // borrow Book
  const [open2, setOpen2] = useState(false);
   const navigate = useNavigate();

  const [borrowBook] = useBorrowBookMutation();
  const form2 = useForm();

  const onSubmitForBorrowBook = async (data: any) => {
    if (!selectedBook) return;

    const quantity = Number(data.quantity);

    // validation before API call
    if (quantity > selectedBook.copies) {
      toast.error("Quantity cannot exceed available copies!");
      return;
    }

    try {
       await borrowBook({
        book: selectedBook._id!, // bookId
        quantity,
        dueDate: data.dueDate.toISOString(), // make sure date is string
      }).unwrap();

      toast.success("Book borrowed successfully");

      setOpen2(false);
      form2.reset();
      navigate("/borrow-summary");

    } catch (error: any) {
      console.error("Borrow failed:", error);
      toast.error(error?.data?.message || "Failed to borrow book");
    }
  };

  return (
    <div className="overflow-x-auto h-screen">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>View Book</TableHead>
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
              <TableCell>
                <Link to={`/books/${book._id}`}>
                  <Button size="sm">View</Button>
                </Link>
              </TableCell>
              <TableCell className="flex gap-2">

                {/* Update Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleOpenUpdate(book)}
                      size="sm"
                      className="cursor-pointer"
                      variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Update Book</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        {/* Title */}
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Author */}
                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author</FormLabel>
                              <FormControl>
                                <Input {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Genre */}
                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Genre</FormLabel>
                              <FormControl>
                                <Select
                                  required={true}
                                  onValueChange={field.onChange}
                                  value={field.value}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select genre" />
                                  </SelectTrigger>
                                  <SelectContent className="w-full">
                                    <SelectItem value="FICTION">
                                      Fiction
                                    </SelectItem>
                                    <SelectItem value="NON-FICTION">
                                      Non-Fiction
                                    </SelectItem>
                                    <SelectItem value="SCIENCE">
                                      Science
                                    </SelectItem>
                                    <SelectItem value="HISTORY">
                                      History
                                    </SelectItem>
                                    <SelectItem value="BIOGRAPHY">
                                      Biography
                                    </SelectItem>
                                    <SelectItem value="FANTASY">
                                      Fantasy
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* ISBN */}
                        <FormField
                          control={form.control}
                          name="isbn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ISBN</FormLabel>
                              <FormControl>
                                <Input {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Copies */}
                        <FormField
                          control={form.control}
                          name="copies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Copies</FormLabel>
                              <FormControl>
                                <Input type="number" required {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Description */}
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} required rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Available */}
                        <FormField
                          control={form.control}
                          name="available"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between border rounded-xl p-3">
                              <div>
                                <FormLabel>Available</FormLabel>
                                <FormDescription>
                                  Toggle availability
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  required={true}
                                  checked={!!field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Update</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog
                  open={deleteBookId === book._id}
                  onOpenChange={(open) => !open && setDeleteBookId(null)}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant="ghost"
                      onClick={() => setDeleteBookId(book._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <AlertDialogHeader>
                      <DialogTitle className="text-xl text-center text-red-500">
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
                  </DialogContent>
                </Dialog>

                {/* Borrow Button */}

                <Dialog open={open2} onOpenChange={setOpen2}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant="ghost"
                      disabled={!book.available}
                      onClick={() => {
                        setSelectedBook(book); // ✅ store current book
                        setOpen2(true);
                      }}>
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    aria-describedby={undefined}
                    className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Borrow Book
                      </DialogTitle>
                    </DialogHeader>

                    {/* use shadCn form */}
                    <Form {...form2}>
                      <form
                        onSubmit={form2.handleSubmit(onSubmitForBorrowBook)}
                        className="space-y-8">
                        {/* quantity field */}
                        <FormField
                          control={form2.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  required
                                  placeholder="Enter quantity"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                  } // ✅ store as number
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* duedate field */}
                        <FormField
                          control={form2.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Due Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      value={field.value || ""}
                                      className={cn(
                                        " flex justify-between font-normal"
                                      )}>
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="w-4 h-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start">
                                  <Calendar
                                    mode="single"
                                    required={true}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Borrow Book</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                    {/* end of form  */}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
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
