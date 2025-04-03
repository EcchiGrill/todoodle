"use client";

import { createTodo } from "@/api/todos";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateTodo = () => {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    try {
      createTodo({ title, completed: false }); // Here should be real API call to create the todo
    } catch (error) {
      console.error(error);
    }
    toast.success("Todo created successfully");
    setTitle("");
    router.refresh();
  };

  return (
    <form className="flex gap-2" onSubmit={submitHandler}>
      <Input
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button className="text-lg" type="submit">
        Add <IoMdAddCircleOutline />
      </Button>
    </form>
  );
};

export default CreateTodo;
