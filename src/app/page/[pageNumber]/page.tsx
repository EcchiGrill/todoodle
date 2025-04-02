import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { getCompletedTodos, getTodos, getTodosByPage } from "@/api/todos";
import { PAGES_COUNT, TODOS_COUNT_ON_PAGE } from "@/constants";
import Todo from "@/components/Todo";

export default async function App({
  params,
}: {
  params: { pageNumber: Promise<string> };
}) {
  const pageNumber = (await params).pageNumber;
  const todos = await getTodos();
  const completedTodos = await getCompletedTodos();
  const pageTodos = await getTodosByPage(Number(pageNumber));
  const pagesCount = Math.ceil(todos.length / TODOS_COUNT_ON_PAGE);

  return (
    <main className="h-screen flex place-content-center">
      <Card className="mt-10 w-[40rem] h-fit">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-primary text-secondary p-3 2xl:p-3.5 rounded-xl">
                <FaPencilAlt className="w-5 h-5" />
              </div>
              <h1 className="text-3xl 2xl:text-4xl font-bold">Todoodle</h1>
            </div>
          </CardTitle>
          <CardDescription>
            <h3 className="text-sm 2xl:text-lg">
              Keep track of your tasks in style
            </h3>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Add new task..." />
            <Button className="text-lg">
              Add <IoMdAddCircleOutline />
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {pageTodos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
              />
            ))}
          </div>

          <Pagination className="mt-5">
            <PaginationContent>
              {Array.from(
                { length: pagesCount < PAGES_COUNT ? pagesCount : PAGES_COUNT },
                (_, i) => i + 1
              ).map((i) => (
                <PaginationLink
                  key={i}
                  href={`/page/${i}`}
                  isActive={i === Number(pageNumber)}
                >
                  {i}
                </PaginationLink>
              ))}
            </PaginationContent>
            <PaginationContent>
              <PaginationEllipsis />
            </PaginationContent>
          </Pagination>
        </CardContent>

        <CardFooter className="border-t border-primary w-full flex justify-between place-items-center py-5 font-thin">
          <span>
            {completedTodos.length} of {todos.length} tasks completed
          </span>
          <span>
            {((completedTodos.length / todos.length) * 100).toFixed(0)}% done
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
