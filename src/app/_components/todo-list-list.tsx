import { type Todo } from "@prisma/client";
import { TodoListListItem } from "./todo-list-list-item";

interface Props {
  todos: Todo[];
}

export const TodoListList = ({ todos }: Props) => {
  return (
    <div className="flex flex-col space-y-4 overflow-auto">
      {todos.map((todo) => (
        <TodoListListItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
