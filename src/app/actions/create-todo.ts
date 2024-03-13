"use server";

import { db } from "~/server/db";

export const createTodo = async (name: string, isCompleted = false) => {
  return await db.todo.create({
    data: {
      name,
      isCompleted,
    },
  });
};
