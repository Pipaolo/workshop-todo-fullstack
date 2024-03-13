// Direct Next.js to only use this component on the client-side
"use client";

// Import necessary hooks from Next.js and React
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the TodoListHeader functional component
export const TodoListHeader = () => {
  // State hook for managing the input field value
  const [name, setName] = useState("");

  // Hook to access the Next.js router for navigation and page refreshes
  const router = useRouter();

  // Handler function for form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TASK: Prevent the default form submission behavior
    // TASK: Use fetch API to send a POST request to '/todo/' endpoint with the new todo name
    // TASK: Reset the input field after submission
    // TASK: Refresh the page to reflect the new todo item
  };

  // Render the form component
  return (
    <form onSubmit={onSubmit} className="flex w-full">
      {/* Input field for entering a new todo item */}
      <input
        id="todo"
        type="text"
        placeholder="Add a new todo" // Placeholder text for the input field
        className="flex-grow rounded-l border border-gray-300 p-2 text-black focus:border-blue-200 focus:outline-none focus:ring focus:ring-blue-200"
        value={name} // Bind the input field value to the component's state
        onChange={(e) => setName(e.target.value)} // Update the state with the input field's current value
      />
      {/* Submit button for the form */}
      <button
        type="submit"
        className="rounded-r bg-blue-500 px-8 py-1 font-bold text-white "
        disabled={!name} // Disable the submit button if the input field is empty
      >
        Submit
      </button>
    </form>
  );
};
