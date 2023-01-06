import { Todo } from "./todos.model";
import { todoService } from "./todo.service";

export type TodoRepoImplementation = {
  getTodos: () => Promise<Todo.Full[]>;
  getTodo: (id: string | number) => Promise<Todo.Full>;
  createTodo: (todo: Todo.Base) => Promise<Todo.Full>;
  updateTodo: (todo: Todo.Full) => Promise<Todo.Full>;
  deleteTodo: (id: string | number) => Promise<void>;
};

export const todoRepoImplementation = (): TodoRepoImplementation => {
  return {
    getTodos: todoService.getTodos.bind(todoService),
    getTodo: todoService.getTodoById.bind(todoService),
    createTodo: todoService.createTodo.bind(todoService),
    updateTodo: todoService.updateTodo.bind(todoService),
    deleteTodo: todoService.deleteTodoById.bind(todoService),
  };
};
