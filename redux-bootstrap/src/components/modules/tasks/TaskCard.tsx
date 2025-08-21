import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import {
  removeTask,
  toggleCompleteState,
} from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { ITask } from "@/types/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

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
              <div className="text-xl font-semibold">
                {task.isCompleted ? (
                  <del className="text-red-500">{task.title}</del>
                ) : (
                  <h3>{task.title}</h3>
                )}
              </div>
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

              <Checkbox
                onClick={() => handleToggleCompleteState(task.id)}
                className="size-5"
                id="terms"
              />
            </div>
          </div>
        </div>
        <h4 className="ml-5">
          {task.isCompleted ? (
            <del className="text-red-500">
              <p>{task.description}</p>
            </del>
          ) : (
            <p>{task.description}</p>
          )}
        </h4>
      </Card>
    </div>
  );
};

export default TaskCard;
