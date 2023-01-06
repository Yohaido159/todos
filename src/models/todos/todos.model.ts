import { uppercase } from "../../utils/string";

export namespace Todo {
  export type Base = {
    id?: string | number;
    title: string;
    description: string;
    is_completed?: boolean;
  };

  export type RequiredId = {
    id: string | number | boolean;
  };

  export type isCompleted = {
    is_completed: boolean;
  }

  export type Full = Base & RequiredId & isCompleted;
}

function todoFactory(todo: Todo.Full) {
  const title = makeTitle(todo.title);
  return {
    id: todo.id,
    title,
    description: todo.description,
    is_completed: todo.is_completed || false,
  };
}

function makeTitle(title: string) {
  return uppercase(title);
}

export default todoFactory;
