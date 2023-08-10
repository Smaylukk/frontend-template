import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'

interface AddTodoProps {
  addTodoHandler: (newTodo: string) => Promise<void>
}

const AddTodo: React.FC<AddTodoProps> = observer(({ addTodoHandler }) => {
  const [newTodo, setNewTodo] = useState('')
  return (
    <Stack direction='row' spacing={1}>
      <TextField
        size='small'
        fullWidth
        type='text'
        id='newTodo'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
      />
      <Button
        color='success'
        variant='outlined'
        onClick={() => {
          addTodoHandler(newTodo).then(() => {
            setNewTodo('')
          })
        }}
      >
        Додати
      </Button>
    </Stack>
  )
})

export default AddTodo
