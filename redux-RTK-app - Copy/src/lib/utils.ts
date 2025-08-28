import type { ITask } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateSecureId(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, x => chars[x % chars.length]).join('');
}

// short task based on priority and isCompleted
export function sortTasks(tasks: ITask[]): ITask[] {
  const priorityOrder: Record<ITask["priority"], number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...tasks].sort((a, b) => {
    // Completed tasks always last
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;

    // If both completed or both not completed → check priority
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
