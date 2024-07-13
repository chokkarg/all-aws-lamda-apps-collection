import { createContext, useContext, useState } from 'react'
import { Todo } from '../useTodos'

interface ITodoContext {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export const TodoProvider = ({ children, props }: any) => {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <TodoContext.Provider
      value={{ todos, setTodos }}
      {...props}
    >
      {children}
    </TodoContext.Provider>
  )
}
