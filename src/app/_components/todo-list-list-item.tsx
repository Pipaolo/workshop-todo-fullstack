"use client";

import { type Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  todo: Todo;
}

export const TodoListListItem = ({ todo }: Props) => {
  const router = useRouter();
  const onMarkAsActionPressed = async () => {
    try {
      await fetch(`/todo/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: todo.name,
          isCompleted: !todo.isCompleted,
        }),
      });
      alert("Todo updated successfully");
    } catch (error) {
      alert("Failed to update todo");
    }

    router.refresh();
  };

  const onDeleteActionPressed = async () => {
    try {
      await fetch(`/todo/${todo.id}`, {
        method: "DELETE",
      });
      alert("Todo deleted successfully");
    } catch (error) {
      alert("Failed to delete todo");
    }

    router.refresh();
  };

  return (
    <div className="flex items-center  rounded border p-4 ">
      <input type="checkbox" readOnly checked={todo.isCompleted} />
      <span className="ml-4 font-bold text-black">{todo.name}</span>
      <div className="grow"></div>
      <div className="flex space-x-2">
        <button
          onClick={onMarkAsActionPressed}
          className="rounded bg-green-300 px-4 py-2 shadow"
        >
          <span className="font-bold text-green-900">
            Mark as {todo.isCompleted ? "incomplete" : "complete"}
          </span>
        </button>
        <button
          className="rounded bg-red-300 px-4 py-2 shadow"
          onClick={onDeleteActionPressed}
        >
          <span className="font-bold text-red-900">Delete</span>
        </button>
      </div>
    </div>
  );
};
