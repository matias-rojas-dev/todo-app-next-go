'use client'

import { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  const [todoData, setTodoData] = useState([])
  const [loading, setLoading] = useState(true)

  const updateTodoData = () => {
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => setTodoData(data))
      .catch((error) => console.error('Error fetching data:', error))
    setLoading(false)
  }

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => setTodoData(data))
      .catch((error) => console.error('Error fetching data:', error))

    setLoading(false)
  }, [])

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <TodoList data={todoData} updateTodoData={updateTodoData} />
          <AddTodo updateTodoData={updateTodoData} />
        </>
      )}
    </div>
  )
}
