import React from "react";
import { Todo } from "../../models/todos/todos.model";
import { useTodoUseCase } from "../../models/todos/todos.views";

type TodoItemProps = {
  todo: Todo.Full;
  todosState: Todo.Full[]; 
  setTodoState: React.Dispatch<React.SetStateAction<Todo.Full[]>>;
};
const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo, todosState, setTodoState } = props;
  const { deleteTodo, updateTodo } = useTodoUseCase(todosState, setTodoState);

  const handleMarkAsDone = () => {
    console.log("Mark as done");
    updateTodo({
      ...todo,
      is_completed: true,
    });
  };

  const handleRemove = () => {
    console.log("Remove");
    deleteTodo(todo.id);
  };

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>{todo.is_completed ? "Completed" : "Not completed"}</p>
      <p>
        <button onClick={handleMarkAsDone}>Mark as done</button>
        <button onClick={handleRemove}>Remove</button>
      </p>
    </div>
  );
};

export default TodoItem;
