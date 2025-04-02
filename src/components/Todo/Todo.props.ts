import { ITodo } from "./../../api/todos";

export interface ITodoProps extends Omit<ITodo, "userId"> {}
