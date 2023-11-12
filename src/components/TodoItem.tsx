import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ITodo } from '../http/todoAPI'
import { Box, Button, ButtonGroup, IconButton, Input, ListItem, Stack } from '@chakra-ui/react'
import { FaEdit, FaTrash, FaCheckSquare, FaSquareFull } from 'react-icons/fa'
import useTodo from '../hooks/useTodo'

interface TodoItemProps {
  item: ITodo
  editIndex: number
  setUpdateState: Dispatch<SetStateAction<boolean>>
  setEditIndex: Dispatch<SetStateAction<number>>
}
const TodoItem: React.FC<TodoItemProps> = observer(
  ({ item, editIndex, setEditIndex, setUpdateState }) => {
    const [editTodo, setEditTodo] = useState('')
    const [
      ,
      deleteTodoHandler,
      editTodoButtonHandler,
      editTodoHandler,
      cancelEditTodoHandler,
      toggleCompletedTodoHandler,
    ] = useTodo(setUpdateState, setEditIndex)

    if (editIndex === item.id) {
      return (
        <ListItem>
          <Stack direction='row' spacing={1} sx={{ width: '100%' }}>
            <Input
              size='small'
              type='text'
              id='newTodo'
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value)
              }}
            />
            <Button
              colorScheme='green'
              onClick={async () => {
                await editTodoHandler(editTodo, editIndex)
              }}
            >
              Зберегти
            </Button>
            <Button colorScheme='red' onClick={cancelEditTodoHandler}>
              Відміна
            </Button>
          </Stack>
        </ListItem>
      )
    } else {
      return (
        <ListItem
          key={item.id}
          className={`todoItem`}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box className={`${item.completed ? 'completedState' : ''}`}>{item.title}</Box>
          <ButtonGroup m={1}>
            {item.completed && (
              <IconButton
                aria-label='check'
                variant='outline'
                onClick={async () => {
                  await toggleCompletedTodoHandler(item.id!, item.completed)
                }}
                icon={<FaCheckSquare />}
              />
            )}
            {!item.completed && (
              <IconButton
                aria-label='uncheck'
                variant='outline'
                onClick={async () => {
                  await toggleCompletedTodoHandler(item.id!, item.completed)
                }}
                icon={<FaSquareFull />}
              />
            )}
            <IconButton
              aria-label='edit'
              variant='outline'
              onClick={() => {
                setEditTodo(item.title)
                editTodoButtonHandler(item.id!)
              }}
              icon={<FaEdit />}
            />
            <IconButton
              aria-label='delete'
              variant='outline'
              onClick={async () => {
                await deleteTodoHandler(item.id!)
              }}
              icon={<FaTrash />}
            />
          </ButtonGroup>
        </ListItem>
      )
    }
  },
)

export default TodoItem
