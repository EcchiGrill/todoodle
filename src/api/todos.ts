import { fetchApi } from "./fetchApi";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type TodosResponse = ITodo[];

type CreateTodoResponse = Omit<ITodo, "userId">;

type CreateTodoBody = Omit<ITodo, "userId" | "id">;

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

export const createTodo = async (
  body: CreateTodoBody
): Promise<CreateTodoResponse> =>
  fetchApi({
    endpoint: "/todos",
    method: "POST",
    body,
  });

export const editTodo = async (
  id: number,
  body: CreateTodoBody
): Promise<CreateTodoResponse> =>
  fetchApi({
    endpoint: `/todos/${id}`,
    method: "PUT",
    body,
  });

export const deleteTodo = async (id: number) =>
  fetchApi({
    endpoint: `/todos/${id}`,
    method: "DELETE",
  });
