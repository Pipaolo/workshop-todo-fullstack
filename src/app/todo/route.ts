// Import the database instance and the schema validation utility
import { db } from "~/server/db";
import { CreateTodoSchema } from "~/shared/schemas";

export async function GET() {
  // Fetch all todo items from the database
  const todos = await db.todo.findMany();

  // Return a 200 OK response with the todo items as the body
  return new Response(JSON.stringify(todos), { status: 200 });
}

// Define an asynchronous POST function to handle incoming POST requests
export async function POST(request: Request) {
  // Parse the incoming request body as JSON and treat it as unknown initially
  const res = (await request.json()) as unknown;

  // Validate the parsed request body against the CreateTodoSchema
  // This ensures the data conforms to the expected structure and types
  const parsedRes = await CreateTodoSchema.safeParseAsync(res);

  // If the validation fails, return a 400 Bad Request response with validation error details
  if (!parsedRes.success) {
    return new Response(JSON.stringify(parsedRes.error), { status: 400 });
  }

  // Destructure the validated data to extract the 'name' and 'isCompleted' properties
  const { name, isCompleted } = parsedRes.data;

  // Create a new todo item in the database using the validated data
  const todo = await db.todo.create({
    data: {
      name,
      isCompleted,
    },
  });

  // Return a 201 Created response with the newly created todo item as the body
  return new Response(JSON.stringify(todo), { status: 201 });
}
