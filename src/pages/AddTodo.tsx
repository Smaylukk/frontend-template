import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface AddTodoProps {
  addTodoHandler: (newTodo: string) => Promise<void>
}

const AddTodo: React.FC<AddTodoProps> = observer(({ addTodoHandler }) => {
  const [newTodo, setNewTodo] = useState('')
  return (
    <InputGroup>
      <Form.Control
        type='text'
        id='newTodo'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
      />
      <Button
        className={'mx-1'}
        variant='primary'
        onClick={() => {
          addTodoHandler(newTodo).then(() => {
            setNewTodo('')
          })
        }}
      >
        Додати
      </Button>
    </InputGroup>
  )
})

export default AddTodo
