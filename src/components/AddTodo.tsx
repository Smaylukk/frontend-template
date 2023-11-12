import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Input, Stack } from '@chakra-ui/react'

interface AddTodoProps {
  addTodoHandler: (newTodo: string) => Promise<void>
}

const AddTodo: React.FC<AddTodoProps> = observer(({ addTodoHandler }) => {
  const [newTodo, setNewTodo] = useState('')
  return (
    <Stack direction='row' spacing={1}>
      <Input
        size='small'
        type='text'
        id='newTodo'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
      />
      <Button
        colorScheme='green'
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
