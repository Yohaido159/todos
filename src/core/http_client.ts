import axios from "axios";

export namespace IHttpClient {
  export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
  export type ReturnPayload<T> = {
    data: T;
    status: number;
  };

  export interface Base {
    get<T>(url: string): Promise<ReturnPayload<T>>;
    post<T>(url: string, data: any): Promise<ReturnPayload<T>>;
    put<T>(url: string, data: any): Promise<ReturnPayload<T>>;
    delete<T>(url: string): Promise<ReturnPayload<T>>;
    getHeader(key: string): string;
    setHeader(key: string, value: string): void;
  }
}

class HttpClient implements IHttpClient.Base {
  headers: { [key: string]: string };
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }
  get(url: string): Promise<any> {
    return axios.get(url, { headers: this.headers });
  }

  post(url: string, data: any): Promise<any> {
    return axios.post(url, data, { headers: this.headers });
  }

  put(url: string, data: any): Promise<any> {
    return axios.put(url, data, { headers: this.headers });
  }

  delete(url: string): Promise<any> {
    return axios.delete(url, { headers: this.headers });
  }

  getHeader(key: string): string {
    return this.headers[key];
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }
}

const todos = [
  {
    id: 1,
    title: "Todo 1",
    description: "Todo 1 description",
    is_completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    description: "Todo 2 description",
    is_completed: false,
  },
  {
    id: 3,
    title: "Todo 3",
    description: "Todo 3 description",
    is_completed: false,
  },
  {
    id: 4,
    title: "Todo 4",
    description: "Todo 4 description",
    is_completed: false,
  },
  {
    id: 5,
    title: "Todo 5",
    description: "Todo 5 description",
    is_completed: false,
  },
];

const removeTodo = (id: number) => {
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
};

const updateTodo = (todo: any) => {
  const index = todos.findIndex((t) => t.id === todo.id);
  todos[index] = todo;
};

const addTodo = (todo: any) => {
  todos.push(todo);
};

const getTodoById = (id: number) => {
  return todos.find((todo) => todo.id === id);
};

const getTodos = () => {
  return todos;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class MockHttpClient extends HttpClient {
  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      delay(1000).then(() => {
        const base = /\/api\/todos$/;
        const detail = /\/api\/todos\/\d+$/;
        if (base.test(url)) {
          resolve({ data: getTodos() });
        } else if (detail.test(url)) {
          const id = parseInt(url.split("/").pop() as string);
          resolve({ data: getTodoById(id) });
        } else {
          reject({ error: "Not Found" });
        }
      });
    });
  }

  post(url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const base = /\/api\/todos$/;
      if (base.test(url)) {
        addTodo({
          ...data,
          id: todos.length + 1,
        });
        resolve({ data: data });
      } else {
        reject({ error: "Not Found" });
      }
    });
  }

  put(url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const base = /\/api\/todos\/\d+$/;
      if (base.test(url)) {
        updateTodo({
          ...data,
        });
        resolve({ data: data });
      } else {
        reject({ error: "Not Found" });
      }
    });
  }

  delete(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const base = /\/api\/todos\/\d+$/;
      if (base.test(url)) {
        const id = parseInt(url.split("/").pop() as string);
        removeTodo(id);
        resolve({ data: {} });
      } else {
        reject({ error: "Not Found" });
      }
    });
  }
}

export { HttpClient, MockHttpClient };
