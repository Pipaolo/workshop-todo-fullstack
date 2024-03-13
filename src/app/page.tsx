// Importing component modules and types
import { TodoListHeader } from "./_components/todo-list-header";
import { TodoListList } from "./_components/todo-list-list";
import { type Todo } from "@prisma/client"; // Type import for Todo from Prisma ORM
import { headers } from "next/headers"; // Next.js utility for accessing request headers

// Define the HomePage component as an asynchronous function
export default async function HomePage() {
  // Retrieve the list of headers from the incoming request
  const headerList = headers();

  // Extract the 'x-forwarded-proto' header to determine the protocol (http or https)
  const scheme = headerList.get("x-forwarded-proto");

  // Extract the 'host' header to get the domain name and port
  const host = headerList.get("host");

  // Construct the base URL using the scheme and host
  const url = `${scheme}://${host}`;

  // Fetch the list of todo items from the server using the constructed URL
  // The response is parsed as JSON and expected to be an array of Todo items
  const todos = await fetch(`${url}/todo/`).then(
    (res) => res.json() as Promise<Todo[]>,
  );

  // Render the main content of the HomePage component
  return (
    <main className="flex h-screen flex-col items-center space-y-4 overflow-hidden bg-gradient-to-tr from-[#4ac7f2] to-[#00364d] p-4 text-white">
      <h1 className="text-4xl font-bold tracking-tighter">A Simple Todo App</h1>
      <div className="container flex grow flex-col space-y-4 overflow-hidden rounded bg-white p-4 shadow ">
        {/* Render the TodoListHeader component */}
        <TodoListHeader />
        {/* Render the TodoListList component, passing the fetched todos as a prop */}
        <TodoListList todos={todos} />
      </div>
    </main>
  );
}
