import { Todo } from './Todo'
import { useTodos } from './useTodos'
import { useEffect, useState } from 'react'
import { fetchTodos } from './api'
import { StyledTodo } from './_styled'

function App() {
  const [todo, setTodo] = useState<string>('')
  const { todos, setTodos, addTodo } = useTodos()

  useEffect(() => {
    fetchTodos().then(d => setTodos(d))
  }, [])

  const createTodo = () => {
    todo && addTodo(todo)
  }

  const onEnter = (key: string) => {
    if (key === 'Enter') {
      setTodo('')
      createTodo()
    }
  }

  return (
    <StyledTodo>
      <h1 className="app-header">GLOBAL TO DO LIST</h1>
      <div className="add-task">
        <input
          type="text"
          value={todo}
          autoComplete="off"
          placeholder="Add New Task"
          onChange={e => setTodo(e.target.value)}
          onKeyDown={e => onEnter(e.key)}
          className="task-input"
        />
        <button
          type="submit"
          onClick={createTodo}
          className="submit-task"
          title="Add Task"
        />
      </div>
      <ul className="task-list">
        {todos?.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </StyledTodo>
  )
}

export default App
