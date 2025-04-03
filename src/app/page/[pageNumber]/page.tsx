import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPencilAlt } from "react-icons/fa";
import { getCompletedTodos, getTodos } from "@/api/todos";
import Todos from "@/components/Todos";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TODOS_PER_PAGE } from "@/constants";
import CreateTodo from "@/components/CreateTodo";
import PaginationWrapper from "@/components/PaginationWrapper";
import { PageProps } from "@/../.next/types/app/layout";

export async function generateStaticParams() {
  const todos = await getTodos();
  return Array.from({
    length: Math.ceil(todos.length / TODOS_PER_PAGE),
  }).map((_, i) => {
    return { pageNumber: String(i + 1) };
  });
}

export default async function App({ params }: PageProps) {
  const pageNumber = Number((await params).pageNumber);
  const todos = await getTodos();
  const completedTodos = await getCompletedTodos();
  const progressPercentage = (completedTodos.length / todos.length) * 100 || 0;
  const pagesCount = Math.ceil(todos.length / TODOS_PER_PAGE);

  return (
    <main className="h-screen flex place-content-center">
      <div
        className={`fixed top-0 left-0 h-1.5 bg-progressBar transition-all duration-500`}
        style={{ width: `${progressPercentage}%` }}
      />
      <Card className="mt-10 max-sm:w-[30rem] w-[40rem] h-fit mx-2">
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
          <CreateTodo />

          <Suspense
            fallback={
              <div className="space-y-3 mt-4">
                <Skeleton className="h-[60px] w-full rounded-lg" />
                <Skeleton className="h-[60px] w-full rounded-lg" />
                <Skeleton className="h-[60px] w-full rounded-lg" />
              </div>
            }
          >
            <Todos pageNumber={pageNumber} />
          </Suspense>

          <PaginationWrapper totalPages={pagesCount} currentPage={pageNumber} />
        </CardContent>

        <CardFooter className="border-t border-primary w-full flex justify-between place-items-center py-5 font-thin">
          {!todos.length ? (
            "No tasks yet. Add one to get started!"
          ) : (
            <span>
              {completedTodos.length} of {todos.length} tasks completed
            </span>
          )}
          <span>{progressPercentage}% done</span>
        </CardFooter>
      </Card>
    </main>
  );
}
