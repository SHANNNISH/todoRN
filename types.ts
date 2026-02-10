export type Priority = "Low" | "Medium" | "High";

export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
  priority: Priority;
}
