// Import the Todo type from Prisma to enforce type checking on todo items
import { type Todo } from "@prisma/client";
// Import the TodoListListItem component, which will be used to render each todo item
import { TodoListListItem } from "./todo-list-list-item";

// Define the Props interface, specifying that the TodoListList component expects a 'todos' prop, which is an array of Todo items
interface Props {
  todos: Todo[];
}

// Define the TodoListList functional component with destructured 'todos' prop
export const TodoListList = ({ todos }: Props) => {
  // Render a div that contains a list of TodoListListItem components
  // Each todo item in the 'todos' array is passed to a TodoListListItem component
  return (
    <div className="flex flex-col space-y-4 overflow-auto">
      {/* Map over the 'todos' array and render a TodoListListItem for each todo */}
      {todos.map((todo) => (
        // TodoListListItem component with a unique 'key' prop (using the todo's id) and the todo item passed as a prop
        <TodoListListItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
