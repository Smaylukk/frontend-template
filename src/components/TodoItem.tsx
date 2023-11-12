import { observer } from 'mobx-react-lite'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { Button, ButtonGroup, Form, InputGroup, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { ITodo } from '../http/todoAPI'
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
        <ListGroup.Item className={'d-flex justify-content-between'}>
          <InputGroup>
            <Form.Control
              type='text'
              id='newTodo'
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value)
              }}
            />
            <Button
              className={'mx-2'}
              variant='primary'
              onClick={async () => {
                await editTodoHandler(editTodo, editIndex)
              }}
            >
              Зберегти
            </Button>
            <Button variant='danger' onClick={cancelEditTodoHandler}>
              Відміна
            </Button>
          </InputGroup>
        </ListGroup.Item>
      )
    } else {
      return (
        <ListGroup.Item key={item.id} className={`d-flex justify-content-between `}>
          <span className={`todoItem ${item.completed ? 'completedState' : ''}`}>{item.title}</span>
          <div className={'mr-auto'}>
            <ButtonGroup>
              {item.completed && (
                <Icon.CheckSquare
                  className={'todoItemButton'}
                  onClick={async () => {
                    await toggleCompletedTodoHandler(item.id!, item.completed)
                  }}
                />
              )}
              {!item.completed && (
                <Icon.Square
                  className={'todoItemButton'}
                  onClick={async () => {
                    await toggleCompletedTodoHandler(item.id!, item.completed)
                  }}
                />
              )}
              <Icon.Pencil
                className={'mx-2 todoItemButton'}
                onClick={() => {
                  setEditTodo(item.title)
                  editTodoButtonHandler(item.id!)
                }}
              />
              <Icon.Trash
                className={'todoItemButton'}
                onClick={async () => {
                  await deleteTodoHandler(item.id!)
                }}
              />
            </ButtonGroup>
          </div>
        </ListGroup.Item>
      )
    }
  },
)

export default TodoItem
