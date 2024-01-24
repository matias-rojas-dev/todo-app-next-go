'use client'

import { useState } from 'react'
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap'

const AddTodo = ({ updateTodoData }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const createTodo = async (event) => {
    event.preventDefault()

    const values = { name: title, status: true }

    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        updateTodoData()
        setTitle('')
        setOpen(false)
      } else {
        console.error('Error al crear la tarea')
      }
    } catch (error) {
      console.error('Error al crear la tarea', error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button variant="primary" className="m-2" onClick={() => setOpen(true)}>
        Agregar Tarea
      </Button>

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nombre de la Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createTodo}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  required
                  type="text"
                  placeholder="Ingresa la Tarea"
                  value={title}
                  onChange={handleTitleChange}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup className="text-center m-2">
              <Button type="submit">Crear</Button>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddTodo
