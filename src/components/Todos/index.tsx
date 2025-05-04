import Todo from "./Todo";
import { getTodosByPage } from "@/api/todos";
import { ITodosProps } from "./Todos.props";

const Todos = async ({ pageNumber }: ITodosProps) => {
  const todos = await getTodosByPage(pageNumber);

  return (
    <div className="mt-8 flex flex-col gap-2">
      {!todos.length && (
        <div className="text-center text-xl font-semibold text-black/40">
          Time to make your first todo..
        </div>
      )}
      {todos?.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          title={todo.title}
        />
      ))}
    </div>
  );
};

export default Todos;
