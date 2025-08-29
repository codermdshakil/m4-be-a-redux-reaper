import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

// ---- Schema ----
const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON-FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(10, "ISBN must be at least 10 characters"),
  description: z.string().min(1, "Description is required"),
  copies: z.preprocess(
    (v) => (typeof v === "string" ? Number(v) : v),
    z.number().int().min(0)
  ),
  available: z.boolean().default(true).optional(),
});

type BookFormValues = z.infer<typeof BookSchema>;

const CreateBook = () => {
  const [createBook, { data, isLoading, isError }] = useCreateBookMutation();

  const form = useForm<BookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

    const navigate = useNavigate();

  const onSubmit = async (values: BookFormValues) => {
    try {
      const payload: IBook = {
        ...values,
        copies: parseInt(values.copies) as number,
        available: values.available ?? true,
      };

      await createBook(payload);
      toast.success("Created a new Book!!");
      navigate("/books")

    } catch (err) {
      toast.error("Something want wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input required placeholder="title" {...field} />
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
                      <Input
                        required
                        placeholder="Robert C. Martin"
                        {...field}
                      />
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
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON-FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
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
                      <Input required placeholder="9780132350884" {...field} />
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
                      <Input
                        required
                        type="number"
                        min={0}
                        step={1}
                        {...field}
                      />
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
                      <Textarea
                        required={true}
                        rows={4}
                        placeholder="Short summary..."
                        {...field}
                      />
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
                  <FormItem className="flex items-center justify-between border rounded-2xl p-4">
                    <div>
                      <FormLabel>Available</FormLabel>
                      <FormDescription>
                        Toggle whether the book is available for borrowing
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

              {/* Submit */}
              <Button type="submit" className="rounded-2xl">
                Save Book
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default CreateBook;
