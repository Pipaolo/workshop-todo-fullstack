// Import the database instance and the schema for creating todos
import { db } from "~/server/db";
import { CreateTodoSchema } from "~/shared/schemas";

// Define a type for the URL parameter expected in requests
type Params = {
  id: string; // Parameter 'id' is expected to be a string
};

// Define an asynchronous DELETE function to handle delete requests
export async function DELETE(
  request: Request, // The incoming request object
  context: {
    // Additional context for the request, including URL parameters
    params: Params; // Destructure the params object to access URL parameters
  },
) {
  const { id } = context.params; // Extract the 'id' from URL parameters
  try {
    // Attempt to delete the todo item with the specified ID from the database
    const todo = await db.todo.delete({
      where: {
        id: Number(id), // Convert the 'id' from string to number as database expects a number
      },
    });

    // If deletion is successful, return the deleted todo item in the response with a 200 status
    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: {
        "Content-Type": "application/json", // Set content type of response to application/json
      },
    });
  } catch (error) {
    // If an error occurs, return the error details with a 500 Internal Server Error status
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// Define an asynchronous PATCH function to handle update requests
export async function PATCH(
  request: Request, // The incoming request object
  context: {
    // Additional context for the request, including URL parameters
    params: Params; // Destructure the params object to access URL parameters
  },
) {
  try {
    const { id } = context.params; // Extract the 'id' from URL parameters
    const body: unknown = await request.json(); // Parse the request body as JSON
    // Validate the parsed body against the CreateTodoSchema
    const parsedBody = await CreateTodoSchema.safeParseAsync(body);
    if (!parsedBody.success) {
      // If validation fails, return a 400 Bad Request response with validation error details
      return new Response(JSON.stringify(parsedBody.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // Extract the 'name' and 'isCompleted' properties from the validated data
    const { name, isCompleted } = parsedBody.data;

    // Attempt to update the todo item with the specified ID in the database
    const todo = await db.todo.update({
      where: {
        id: Number(id), // Convert the 'id' from string to number for database compatibility
      },
      data: {
        name,
        isCompleted,
      },
    });

    // If update is successful, return the updated todo item in the response with a 200 status
    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // If an error occurs, return the error details with a 500 Internal Server Error status
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
