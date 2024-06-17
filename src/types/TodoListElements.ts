export interface TodoListElementType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export type TodoListType = TodoListElementType[];
