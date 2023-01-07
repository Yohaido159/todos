import { useReducer, useState } from "react";
import { loogerRepo } from "../../core/looger";
import { Todo } from "./todos.model";
import { createTodoRepo } from "./todos.repo";
import { createTodoUseCase } from "./todos.usecase";

const todoUseCase = createTodoUseCase(createTodoRepo(), loogerRepo());

type Loading = {
  getTodos: boolean;
  addTodo: boolean;
  updateTodo: boolean;
  deleteTodo: boolean;
};

export const useTodoUseCase = (
  todos: Todo.Full[],
  setTodos: React.Dispatch<React.SetStateAction<Todo.Full[]>>
) => {
  const reducer = (state: Loading, newState: Partial<Loading>) => ({
    ...state,
    ...newState,
  });
  const [loading, setLoading] = useReducer(reducer, {
    getTodos: false,
    addTodo: false,
    updateTodo: false,
    deleteTodo: false,
  });

  const getTodos = async () => {
    setLoading({ getTodos: true });
    const todos = await todoUseCase.getTodos();
    setTodos(todos);
    setLoading({ getTodos: false });
  };

  const addTodo = async (todo: Todo.Base) => {
    setLoading({ addTodo: true });
    const newTodo = await todoUseCase.createTodo(todo);
    setLoading({ addTodo: false });
    setTodos((todos) => [...todos, newTodo]);
  };

  const updateTodo = async (todo: Todo.Full) => {
    setLoading({ updateTodo: true });
    const updatedTodo = await todoUseCase.updateTodo(todo);
    setLoading({ updateTodo: false });
    setTodos((todos) =>
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: number | string) => {
    setLoading({ deleteTodo: true });
    await todoUseCase.deleteTodo(id);
    setLoading({ deleteTodo: false });
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    loading,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
