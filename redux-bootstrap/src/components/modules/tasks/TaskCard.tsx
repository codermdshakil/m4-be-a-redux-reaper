import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ITask } from "@/types/types";
import { Trash2 } from "lucide-react";

interface IProps{
  task:ITask
}

const TaskCard = ({task}:IProps) => {
  return (
    <div>
      <Card className="w-full p-3 mb-4">
        <div>
          <div className="flex justify-between  ">
            <div className="flex items-center gap-4">
              <div className={cn("size-3 rounded-full ", {
                "bg-green-500":task.priority === 'low',
                "bg-yellow-500":task.priority === 'medium',
                "bg-red-500":task.priority === 'high',
              })}></div>
              <h3>{task.title}</h3>
            </div>
            <div className="flex items-center gap-4">
              <Trash2  className="size-6 text-red-500 cursor-pointer"/>
              <Checkbox className="size-5" id="terms" />
            </div>
          </div>
        </div>
        <h4>{task.description}</h4>
      </Card>
    </div>
  );
};

export default TaskCard;
