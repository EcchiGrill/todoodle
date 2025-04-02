"use client";
import { useState } from "react";
import { ITodoProps } from "./Todo.props";
import {
  FaPencilAlt,
  FaRegCheckSquare,
  FaRegSquare,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Input } from "../ui/input";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Todo = ({ title, id, completed }: ITodoProps) => {
  const [titleText, setTitleText] = useState<string>(title);
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-3 p-4 bg-[#faf6f1] rounded-lg hover:bg-[#f5ede4] transition-colors group">
      <button
        onClick={() => setIsCompleted((prev) => !prev)}
        className="flex-shrink-0"
      >
        {isCompleted ? (
          <FaRegCheckSquare className="w-6 h-6 text-[#5c8c3e]" />
        ) : (
          <FaRegSquare className="w-6 h-6 text-primary/40" />
        )}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="flex-1 px-3 py-1 rounded border border-[#d4c3b3] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          />
          <button
            onClick={() => setIsEditing(false)}
            className="text-[#5c8c3e] hover:text-[#4a7032]"
          >
            <FaRegCheckSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-primary/40 hover:text-primary/60"
          >
            <AiOutlineCloseSquare className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <span
          className={`flex-1 ${
            isCompleted ? "line-through text-primary/40" : "text-primary"
          }`}
        >
          {titleText}
        </span>
      )}

      {!isEditing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-[#724316]"
          >
            <FaPencilAlt className="w-5 h-5" />
          </button>
          <button
            onClick={() => console.log(`Remove Handler for ${id}`)}
            className="text-[#c25d47] hover:text-[#a94b37]"
          >
            <FaRegTrashAlt className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
