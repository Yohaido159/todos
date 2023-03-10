import  { useEffect, useState } from "react";
import { Todo } from "../../models/todos/todos.model";
import { useTodoUseCase } from "../../models/todos/todos.views";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todosState, setTodosState] = useState<Todo.Full[]>([]);
  const { todos, getTodos, loading } = useTodoUseCase(todosState, setTodosState);

  useEffect(() => {
    getTodos();
  }, []);

  if (loading.getTodos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          todosState={todosState}
          setTodoState={setTodosState}
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
