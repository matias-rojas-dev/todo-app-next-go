'use client'

import React, { useState } from 'react'

function TodoList({ data, updateTodoData }) {
  const [editingTask, setEditingTask] = useState(null)
  const [title, setTitle] = useState('')

  const handleEdit = (task) => {
    setEditingTask(task)
    setTitle(task.name)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setTitle('')
  }

  const handleUpdate = async () => {
    if (!editingTask) return

    const updatedTask = { ...editingTask, name: title }

    try {
      const response = await fetch(
        `http://localhost:3001/tasks/${updatedTask.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        }
      )

      if (response.ok) {
        updateTodoData()
        handleCancelEdit()
      } else {
        console.error('Error al editar la tarea')
      }
    } catch (error) {
      console.error('Error al editar la tarea', error)
    }
  }

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        updateTodoData()
      } else {
        console.error('Error al eliminar la tarea')
      }
    } catch (error) {
      console.error('Error al eliminar la tarea', error)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul className="list-group">
            {data?.map((todo) => (
              <li
                key={`todo_list__${todo.id}`}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  todo.status ? 'bg-teal text-black' : 'bg-gray text-dark'
                }`}
              >
                {editingTask === todo ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                      className="btn btn-success m-2"
                      onClick={handleUpdate}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    {todo.name}
                    <span
                      className={`badge ${
                        todo.status ? 'bg-success' : 'bg-warning'
                      } rounded-pill`}
                    >
                      {todo.status ? 'Activa' : 'Terminada'}
                    </span>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(todo)}
                    >
                      Editar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoList
