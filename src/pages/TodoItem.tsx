import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { ITodo } from '../http/todoAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TodoItemProps {
  item: ITodo
  editIndex: number
  deleteTodoHandler: (id: number) => Promise<void>
  editTodoHandler: (editTodo: string) => Promise<void>
  cancelEditTodoHandler: () => void
  editTodoButtonHandler: (editIndex: number) => void
  toggleCompletedTodoHandler: (id: number, currentStateCompleted: boolean) => Promise<void>
}
const TodoItem: React.FC<TodoItemProps> = observer(
  ({
    item,
    editIndex,
    editTodoHandler,
    deleteTodoHandler,
    cancelEditTodoHandler,
    toggleCompletedTodoHandler,
    editTodoButtonHandler,
  }) => {
    const [editTodo, setEditTodo] = useState('')

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
              className={'mx-1'}
              variant='primary'
              onClick={async () => {
                await editTodoHandler(editTodo)
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
        <ListGroup.Item
          key={item.id}
          className={`d-flex justify-content-between todoItem ${
            item.completed ? 'completedState' : ''
          }`}
        >
          {item.title}
          <div className={'mr-auto'}>
            <FontAwesomeIcon
              color={'blue'}
              className={'todoItemButton'}
              icon={item.completed ? 'square-check' : 'square-minus'}
              onClick={async () => {
                await toggleCompletedTodoHandler(item.id!, item.completed)
              }}
            />
            <FontAwesomeIcon
              className={'mx-2 todoItemButton'}
              color={'green'}
              icon={'pen'}
              onClick={() => {
                setEditTodo(item.title)
                editTodoButtonHandler(item.id!)
              }}
            />
            <FontAwesomeIcon
              className={'todoItemButton'}
              icon={'trash'}
              color={'red'}
              onClick={async () => {
                await deleteTodoHandler(item.id!)
              }}
            />
          </div>
        </ListGroup.Item>
      )
    }
  },
)

export default TodoItem
