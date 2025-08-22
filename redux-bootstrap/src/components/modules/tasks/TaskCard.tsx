import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import {
  removeTask,
  toggleCompleteState,
  updateTask,
} from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { ITask } from "@/types/types";
import { format } from "date-fns";
import { CalendarIcon, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  // handle remove task
  const handleRemoveTask = () => {
    if (selectedId) {
      dispatch(removeTask(selectedId));
      setSelectedId(null); // reset after delete
    }
  };

  // handle toggle complete state

  const handleToggleCompleteState = (id: string) => {
    dispatch(toggleCompleteState(id));
  };

  const form = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "low",
      dueDate: task?.dueDate,
    },
  });

  // handle update task
  const handleUpdateTask = (data: any) => {
    const { id, isCompleted } = task;
    const updatedData: ITask = {
      ...data,
      id,
      isCompleted,
    };
    dispatch(updateTask(updatedData));
  };

  return (
    <div>
      <Card className="w-full p-3 mb-4">
        <div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn("size-3 rounded-full ", {
                  "bg-green-500": task.priority === "low",
                  "bg-yellow-500": task.priority === "medium",
                  "bg-red-500": task.priority === "high",
                })}
              />
              <h3
                className={cn(
                  {
                    "line-through": task.isCompleted,
                    "text-xl text-red-500": task.isCompleted,
                  },
                  "text-xl"
                )}>
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedId(task.id)} // just store id
                  >
                    <Trash2 className="size-6 text-red-500 cursor-pointer" />
                  </Button>
                </DialogTrigger>

                <DialogContent
                  className="sm:max-w-[425px]"
                  aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-red-500">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4">
                    <DialogClose asChild>
                      <Button
                        onClick={handleRemoveTask}
                        className="bg-green-500 hover:bg-green-600">
                        Yes
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => setSelectedId(null)} // reset if cancel
                      >
                        No
                      </Button>
                    </DialogClose>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedId(null)}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* handle toggle checkbox  */}
              <Checkbox
                checked={task.isCompleted}
                onClick={() => handleToggleCompleteState(task.id)}
                className="size-5"
                id="terms"
              />

              {/* here update task edit */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><Edit/></Button>
                </DialogTrigger>
                <DialogContent
                  aria-describedby={undefined}
                  className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center text-green-500">
                      Update Task!
                    </DialogTitle>
                  </DialogHeader>

                  {/* use shadCn form */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleUpdateTask)}
                      className="space-y-8">
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
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select
                              required={true}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value || ""}>
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

                      {/* duedate field */}
                      <FormField
                        control={form.control}
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
                        <Button type="submit">Update Task</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                  {/* end of form  */}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <h4
          className={cn(
            { "text-red-500 line-through": task.isCompleted },
            "ml-5"
          )}>
          {task.description}
        </h4>
      </Card>
    </div>
  );
};

export default TaskCard;
