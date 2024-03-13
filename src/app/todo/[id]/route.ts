import { db } from "~/server/db";
import { CreateTodoSchema } from "~/shared/schemas";

type Params = {
  id: string;
};

export async function DELETE(
  request: Request,
  context: {
    params: Params;
  },
) {
  const { id } = context.params;
  try {
    const todo = await db.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(
  request: Request,
  context: {
    params: Params;
  },
) {
  try {
    const { id } = context.params;
    const body: unknown = await request.json();
    const parsedBody = await CreateTodoSchema.safeParseAsync(body);
    if (!parsedBody.success) {
      return new Response(JSON.stringify(parsedBody.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const { name, isCompleted } = parsedBody.data;

    const todo = await db.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        isCompleted,
      },
    });

    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
