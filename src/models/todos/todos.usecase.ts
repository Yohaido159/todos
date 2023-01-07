import { LoggerRepo } from "../../core/looger";
import { TodoRepo } from "./todos.repo";


export const createTodoUseCase = (
  todoRepo: TodoRepo,
  loogerRepo?: LoggerRepo
): TodoRepo => ({
  getTodos: (...args) => {
    loogerRepo?.log("getTodos");
    return todoRepo.getTodos(...args);
  },
  getTodo: (...args) => {
    loogerRepo?.log("getTodo");
    return todoRepo.getTodo(...args);
  },
  createTodo: (...args) => {
    loogerRepo?.log("createTodo");
    return todoRepo.createTodo(...args);
  },
  updateTodo: (...args) => {
    loogerRepo?.log("updateTodo");
    return todoRepo.updateTodo(...args);
  },
  deleteTodo: (...args) => {
    loogerRepo?.log("deleteTodo");
    return todoRepo.deleteTodo(...args);
  },
});

