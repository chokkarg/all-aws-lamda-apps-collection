import { Todo, useTodos } from "./useTodos";
import { StyledTodoItem } from "./_styled";

export function Todo({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodos();

  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    toggleTodo(todo.id, value);
  };

  const onDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <StyledTodoItem>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={onchange} />
        <span>{todo.todo}</span>
      </label>
      <span className="delete-btn" title="Delete Task" onClick={onDelete} />
    </StyledTodoItem>
  );
}
