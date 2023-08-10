import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { ITodo } from '../http/todoAPI'
import {
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBListGroupItem,
  MDBTypography,
} from 'mdb-react-ui-kit'

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
        <MDBListGroupItem key={item.id} className={`d-flex justify-content-between `}>
          <MDBTypography className={`todoItem ${item.completed ? 'completedState' : ''}`}>
            {item.title}
          </MDBTypography>
          <MDBBtnGroup size='sm'>
            {item.completed && (
              <MDBBtn tag='a' color='none' className='m-1' size='lg' style={{ color: '#000000' }}>
                <MDBIcon
                  fas
                  size='lg'
                  icon='minus'
                  onClick={async () => {
                    await toggleCompletedTodoHandler(item.id!, item.completed)
                  }}
                />
              </MDBBtn>
            )}
            {!item.completed && (
              <MDBBtn tag='a' color='none' className='m-1' size='lg' style={{ color: '#000000' }}>
                <MDBIcon
                  fas
                  size='lg'
                  icon='check-square'
                  out
                  onClick={async () => {
                    await toggleCompletedTodoHandler(item.id!, item.completed)
                  }}
                />
              </MDBBtn>
            )}
            <MDBBtn tag='a' color='none' className='m-1' size='lg' style={{ color: '#000000' }}>
              <MDBIcon
                fas
                size='lg'
                icon='edit'
                onClick={() => {
                  setEditTodo(item.title)
                  editTodoButtonHandler(item.id!)
                }}
              />
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='m-1' size='lg' style={{ color: '#000000' }}>
              <MDBIcon
                fas
                size='lg'
                icon='trash-alt'
                onClick={async () => {
                  await deleteTodoHandler(item.id!)
                }}
              />
            </MDBBtn>
          </MDBBtnGroup>
        </MDBListGroupItem>
      )
    }
  },
)

export default TodoItem
