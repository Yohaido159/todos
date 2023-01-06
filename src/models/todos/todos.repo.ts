import { TodoRepoImplementation } from "./todos.implement";

export function createTodoRepo(repoImplentation: TodoRepoImplementation) {
    return {
        getTodos: repoImplentation.getTodos,
        getTodo: repoImplentation.getTodo,
        createTodo: repoImplentation.createTodo,
        updateTodo: repoImplentation.updateTodo,
        deleteTodo: repoImplentation.deleteTodo
    };
}