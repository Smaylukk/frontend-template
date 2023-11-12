import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { MDBBtn, MDBInput, MDBInputGroup } from 'mdb-react-ui-kit'

interface AddTodoProps {
  addTodoHandler: (newTodo: string) => Promise<void>
}

const AddTodo: React.FC<AddTodoProps> = observer(({ addTodoHandler }) => {
  const [newTodo, setNewTodo] = useState('')
  return (
    <MDBInputGroup>
      <MDBInput
        type='text'
        id='newTodo'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
      />
      <MDBBtn
        className={'mx-1'}
        color='success'
        onClick={() => {
          addTodoHandler(newTodo).then(() => {
            setNewTodo('')
          })
        }}
      >
        Додати
      </MDBBtn>
    </MDBInputGroup>
  )
})

export default AddTodo
