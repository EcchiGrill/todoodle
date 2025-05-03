"use client";
import { useState } from "react";
import { ITodoProps } from "./Todo.props";
import {
  FaPencilAlt,
  FaRegCheckSquare,
  FaRegSquare,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { deleteTodo, editTodo } from "@/api/todos";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

const Todo = ({ title, id, completed }: ITodoProps) => {
  const router = useRouter();
  const [titleText, setTitleText] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const completeTodoHandler = async () => {
    try {
      await editTodo(id, {
        title,
        completed: !completed,
      });
    } catch (error) {
      console.error(error);
    }
    router.refresh();
    if (!completed) toast.success("Well done!");
  };

  const editTodoHandler = async () => {
    try {
      await editTodo(id, {
        title: titleText,
        completed,
      });
    } catch (error) {
      console.error(error);
    }

    setIsEditing(false);
    toast.success("Todo edited successfully");
    router.refresh();
  };

  const closeEditHandler = () => {
    setIsEditing(false);
    setTitleText(title);
  };

  const removeTodoHandler = async () => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
    }

    toast.success("Todo deleted successfully");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-todo rounded-lg hover:bg-secondary/70 transition-colors group">
      <button onClick={completeTodoHandler} className="flex-shrink-0">
        {completed ? (
          <FaRegCheckSquare className="w-6 h-6 text-green-600" />
        ) : (
          <FaRegSquare className="w-6 h-6 text-primary/40" />
        )}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="flex-1 px-3 py-1 border-secondary"
          />
          <button
            onClick={editTodoHandler}
            className="text-green-600 hover:text-green-700"
          >
            <IoCheckmarkSharp className="w-5 h-5" />
          </button>
          <button
            onClick={closeEditHandler}
            className="text-primary/40 hover:text-primary/60"
          >
            <FaXmark className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <span
          className={`flex-1 ${
            completed ? "line-through text-primary/40" : "text-primary"
          }`}
        >
          {titleText}
        </span>
      )}

      {!isEditing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-primary/60"
          >
            <FaPencilAlt className="w-5 h-5" />
          </button>
          <button
            onClick={removeTodoHandler}
            className="text-red-500 hover:text-red-600"
          >
            <FaRegTrashAlt className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
