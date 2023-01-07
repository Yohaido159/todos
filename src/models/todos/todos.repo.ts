import { todoService } from "./todo.service";
import { Todo } from "./todos.model";

export type TodoRepo = {
  getTodos: () => Promise<Todo.Full[]>;
  getTodo: (id: string | number) => Promise<Todo.Full>;
  createTodo: (todo: Todo.Base) => Promise<Todo.Full>;
  updateTodo: (todo: Todo.Full) => Promise<Todo.Full>;
  deleteTodo: (id: string | number) => Promise<void>;
};


function createTodoRepo() {
    return {
        getTodos: todoService.getTodos.bind(todoService),
        getTodo: todoService.getTodoById.bind(todoService),
        createTodo: todoService.createTodo.bind(todoService),
        updateTodo: todoService.updateTodo.bind(todoService),
        deleteTodo: todoService.deleteTodoById.bind(todoService)
    };
}

export { createTodoRepo };
