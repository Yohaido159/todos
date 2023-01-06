import { useState } from "react";
import { Todo } from "./todos.model";
import { todoUseCase } from "./todos.usecase";

export const useTodoUseCase = (
  todos: Todo.Full[],
  setTodos: React.Dispatch<React.SetStateAction<Todo.Full[]>>
) => {
  const getTodos = async () => {
    const todos = await todoUseCase.getTodos();
    setTodos(todos);
  };

  const addTodo = async (todo: Todo.Base) => {
    const newTodo = await todoUseCase.createTodo(todo);
    setTodos((todos) => [...todos, newTodo]);
  };

  const updateTodo = async (todo: Todo.Full) => {
    const updatedTodo = await todoUseCase.updateTodo(todo);
    setTodos((todos) =>
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: number | string) => {
    await todoUseCase.deleteTodo(id);
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
