import { useContext, useEffect, useState } from "react";
import { fetchTodos, toggleTodo, deleteTodo, createTodo } from "./api";
import { TodoContext } from "./Context";

export interface Todo {
  completed: boolean;
  createdAt: string;
  id: string;
  todo: string;
}

export interface IUseTodos {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  addTodo: (todo: string) => void;
}
export function useTodos(): IUseTodos {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useTodos should be used within a TodoProvider");
  }

  const { todos, setTodos } = context;

  const togTodo = async (id: string, completed: boolean) => {
    const res = await toggleTodo({ id, completed });
    const todoPosition = todos.findIndex((t) => t.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoPosition, 1, JSON.parse(res?.body));
    setTodos(newTodos);
  };

  const removeTodo = async (id: string) => {
    const res = await deleteTodo(id);
    if (res) {
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);
    }
  };

  const addTodo = async (todo: string) => {
    const res = await createTodo(todo);
    setTodos([...todos, JSON.parse(res?.body)]);
  };

  return {
    todos,
    setTodos,
    toggleTodo: togTodo,
    deleteTodo: removeTodo,
    addTodo,
  };
}
