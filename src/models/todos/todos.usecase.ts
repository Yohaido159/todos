import { todoRepoImplementation } from "./todos.implement";
import { createTodoRepo } from "./todos.repo";

function createTodoUseCase() {
  return createTodoRepo(todoRepoImplementation());
}

export const todoUseCase = createTodoUseCase();
