import { observer } from 'mobx-react-lite'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { ITodo } from '../http/todoAPI'
import {
  Button,
  ButtonGroup,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import UnCheckBoxIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
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
            <TextField
              size='small'
              fullWidth
              type='text'
              id='newTodo'
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value)
              }}
            />
            <Button
              color='success'
              variant={'contained'}
              onClick={async () => {
                await editTodoHandler(editTodo, editIndex)
              }}
            >
              Зберегти
            </Button>
            <Button variant={'contained'} color='error' onClick={cancelEditTodoHandler}>
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
          <Typography className={`${item.completed ? 'completedState' : ''}`}>
            {item.title}
          </Typography>
          <ButtonGroup>
            {item.completed && (
              <IconButton
                onClick={async () => {
                  await toggleCompletedTodoHandler(item.id!, item.completed)
                }}
              >
                <CheckBoxIcon />
              </IconButton>
            )}
            {!item.completed && (
              <IconButton
                onClick={async () => {
                  await toggleCompletedTodoHandler(item.id!, item.completed)
                }}
              >
                <UnCheckBoxIcon />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                setEditTodo(item.title)
                editTodoButtonHandler(item.id!)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={async () => {
                await deleteTodoHandler(item.id!)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </ListItem>
      )
    }
  },
)

export default TodoItem
