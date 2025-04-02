import { fetchApi } from "./fetchApi";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type TodosResponse = ITodo[];

type CreateTodoResponse = Omit<ITodo, "userId">;

export const getTodos = async (): Promise<TodosResponse> =>
  fetchApi({
    endpoint: "/todos",
    method: "GET",
  });

export const getCompletedTodos = async (): Promise<TodosResponse> =>
  fetchApi({
    endpoint: "/todos?completed=true",
    method: "GET",
  });

export const getTodosByPage = async (
  pageNumber: number
): Promise<TodosResponse> =>
  fetchApi({
    endpoint: `/todos?_page=${pageNumber}`,
    method: "GET",
  });

export const createTodo = async (): Promise<CreateTodoResponse> =>
  fetchApi({
    endpoint: "/todos",
    method: "POST",
  });

export const removeTodo = async () =>
  fetchApi({
    endpoint: "/todos",
    method: "DELETE",
  });
