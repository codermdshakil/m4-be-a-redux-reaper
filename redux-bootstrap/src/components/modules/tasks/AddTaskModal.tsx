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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export function AddTaskModal() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const form = useForm();

  const onSubmit = (data: any) => {
    const createdAt = new Date(); // current date & time
    const dueDate = date || new Date(); // take from calendar (fallback: now)

    // calculate difference in days
    const diffTime = dueDate.getTime() - createdAt.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // 1000ms * 60s * 60m * 24h = 1 day

    const finalObj = {
      ...data,
      createdAt: createdAt.toISOString(),
      dueDate: dueDate.toISOString(),
      durationInDays: diffDays, // difference between dueDate & createdAt
    };

    console.log(finalObj, "final task");
    form.reset({
      Priority: undefined,
    });
    setDate(undefined); // reset calendar date
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add task</DialogTitle>
        </DialogHeader>

        {/* use shadCn form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      required={true}
                      placeholder="title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      required={true}
                      placeholder="description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* priority field */}
            <FormField
              control={form.control}
              name="Priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    required={true}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value || ""}
                    >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="high"> high </SelectItem>
                      <SelectItem value="medium"> medium </SelectItem>
                      <SelectItem value="low"> low </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* duedate is here */}

            <div className="flex flex-col w-full gap-3">
              <Label htmlFor="date" className="px-1">
                Due Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="w-full" asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal">
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    required={true}
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </Form>
        {/* end of form  */}
      </DialogContent>
    </Dialog>
  );
}
