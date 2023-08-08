import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { ITodo } from '../http/todoAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDBBtn, MDBInput, MDBInputGroup, MDBListGroupItem } from 'mdb-react-ui-kit'

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
        <MDBListGroupItem className={'d-flex justify-content-between'}>
          <MDBInputGroup>
            <MDBInput
              type='text'
              id='newTodo'
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value)
              }}
            />
            <MDBBtn
              className={'mx-1'}
              color='success'
              onClick={async () => {
                await editTodoHandler(editTodo)
              }}
            >
              Зберегти
            </MDBBtn>
            <MDBBtn color='danger' onClick={cancelEditTodoHandler}>
              Відміна
            </MDBBtn>
          </MDBInputGroup>
        </MDBListGroupItem>
      )
    } else {
      return (
        <MDBListGroupItem
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
        </MDBListGroupItem>
      )
    }
  },
)

export default TodoItem
