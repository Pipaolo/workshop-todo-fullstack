"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const TodoListHeader = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/todo/", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        id="todo"
        type="text"
        placeholder="Add a new todo"
        className="flex-grow rounded-l border border-gray-300 p-2 text-black focus:border-blue-200 focus:outline-none focus:ring focus:ring-blue-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r bg-blue-500 px-8 py-1 font-bold text-white "
        disabled={!name}
      >
        Submit
      </button>
    </form>
  );
};
