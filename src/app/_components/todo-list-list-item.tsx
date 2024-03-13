// Direct Next.js to only use this component on the client-side
"use client";

// Import the Todo type from Prisma for type checking and the useRouter hook from Next.js
import { type Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

// Define the props expected by the TodoListListItem component
interface Props {
  todo: Todo; // The 'todo' prop must be an object of type Todo
}

// Define the TodoListListItem functional component with destructured 'todo' prop
export const TodoListListItem = ({ todo }: Props) => {
  // Use the useRouter hook for navigation actions, such as refreshing the page
  const router = useRouter();

  // Function to toggle the completion status of a todo item
  const onMarkAsActionPressed = async () => {
    // TASK: Send a PATCH request to update the todo's completion status
    // BONUS: Handle errors and display an appropriate message
  };

  // Function to delete a todo item
  const onDeleteActionPressed = async () => {
    // TASK: Send a DELETE request to remove the todo item
    // BONUS: Handle errors and display an appropriate message
  };

  // Render the todo item with its name, a checkbox indicating its completion status, and action buttons
  return (
    <div className="flex items-center rounded border p-4">
      {/* Checkbox to indicate whether the todo is completed or not */}
      <input type="checkbox" readOnly checked={todo.isCompleted} />
      {/* Display the todo's name */}
      <span className="ml-4 font-bold text-black">{todo.name}</span>
      <div className="grow"></div> {/* Spacer to push buttons to the right */}
      <div className="flex space-x-2">
        {/* Button to toggle the completion status of the todo */}
        <button
          onClick={onMarkAsActionPressed}
          className="rounded bg-green-300 px-4 py-2 shadow"
        >
          <span className="font-bold text-green-900">
            Mark as {todo.isCompleted ? "incomplete" : "complete"}
          </span>
        </button>
        {/* Button to delete the todo item */}
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
