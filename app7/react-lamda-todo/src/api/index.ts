import { Todo } from '../useTodos'

export const fetchTodos = (): Promise<Todo[]> => {
  return fetch('https://o6tcckjzsd.execute-api.ap-southeast-2.amazonaws.com/todos')
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(e => console.log('fetchTodos Error : ', e))
}

export const fetchTodo = ({ id }: { id: string }): Promise<Todo> => {
  return fetch(`https://o6tcckjzsd.execute-api.ap-southeast-2.amazonaws.com/todo/${id}`)
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(e => console.log('fetchTodo Error : ', e))
}

export const toggleTodo = ({ id, completed }: { id: string; completed: boolean }) => {
  return fetch(`https://o6tcckjzsd.execute-api.ap-southeast-2.amazonaws.com/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify({
      completed: completed,
    }),
  })
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(e => console.log('fetchTodo Error : ', e))
}

export const deleteTodo = (id: string): Promise<boolean | void> => {
  return fetch(`https://o6tcckjzsd.execute-api.ap-southeast-2.amazonaws.com/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.status)
    .then(data => data === 200)
    .catch(e => console.log('fetchTodo Error : ', e))
}

export const createTodo = (todo: string) => {
  return fetch(`https://o6tcckjzsd.execute-api.ap-southeast-2.amazonaws.com/add`, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(e => console.log('fetchTodo Error : ', e))
}
