import { HttpClient, IHttpClient, MockHttpClient } from "../../core";
import todoFactory, { Todo } from "./todos.model";

const TodoApi = {
    base : "/api/todos",
    detail : (id: string | number) => `/api/todos/${id}`
}

class TodoService {
  constructor(public httpClient: IHttpClient.Base) {
    this.httpClient = httpClient;
  }

  async getTodos() {
    const { data: todos } = await this.httpClient.get<Todo.Full[]>(
      TodoApi.base
    );
    console.log("🚀 ~ file: todo.service.ts:16 ~ TodoService ~ getTodos ~ todos", todos)
    return todos.map((todo) => todoFactory(todo));
  }

  async getTodoById(id: string | number) {
    const { data: todo } = await this.httpClient.get<Todo.Full>(
      TodoApi.detail(id)
    );
    return todoFactory(todo);
  }

  async createTodo(todo: Todo.Base) {
    const { data: newTodo } = await this.httpClient.post<Todo.Full>(
      TodoApi.base,
      todo
    );
    return todoFactory(newTodo);
  }

  async updateTodo(todo: Todo.Full) {
    const { data: updatedTodo } = await this.httpClient.put<Todo.Full>(
      TodoApi.detail(todo.id),
      todo
    );
    return todoFactory(updatedTodo);
  }

  async deleteTodoById(id: string | number) {
    await this.httpClient.delete(TodoApi.detail(id));
  }
}

// export const todoService = new TodoService(new HttpClient());
export const todoService = new TodoService(new MockHttpClient());
