import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TodoProvider } from './Context'
import { GlobalStyles } from './_styled'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <GlobalStyles />
      <App />
    </TodoProvider>
  </React.StrictMode>,
)
