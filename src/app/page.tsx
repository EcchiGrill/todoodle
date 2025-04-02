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
  PaginationLink,
} from "@/components/ui/pagination";

export default function Home() {
  return (
    <main className="h-screen flex place-content-center place-items-center">
      <Card className="w-[40rem] h-[50rem]">
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

          <ul className="mt-8 flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>Todo {i}</li>
            ))}
          </ul>

          <Pagination className="mt-5">
            <PaginationContent>
              {[1, 2, 3, 4, 5].map((i) => (
                <PaginationLink key={i} href={`#page${i}`}>
                  {i}
                </PaginationLink>
              ))}
            </PaginationContent>
          </Pagination>
        </CardContent>

        <CardFooter className="border-t border-primary w-full flex justify-between place-items-center py-5 font-thin">
          <span>No tasks yet. Add one to get started!</span>
          <span>{"0%"} done</span>
        </CardFooter>
      </Card>
    </main>
  );
}
