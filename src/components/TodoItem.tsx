import { observer } from 'mobx-react-lite'
import React, { useState, Dispatch, SetStateAction } from 'react'
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
                await editTodoHandler(editTodo, editIndex)
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
                  far
                  size='lg'
                  icon='check-square'
                  onClick={async () => {
                    await toggleCompletedTodoHandler(item.id!, item.completed)
                  }}
                />
              </MDBBtn>
            )}
            {!item.completed && (
              <MDBBtn tag='a' color='none' className='m-1' size='lg' style={{ color: '#000000' }}>
                <MDBIcon
                  far
                  size='lg'
                  icon='square'
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
