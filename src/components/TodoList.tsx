import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction } from 'react'
import { ITodo } from '../http/todoAPI'
import TodoItem from './TodoItem'
import { MDBListGroup } from 'mdb-react-ui-kit'

interface TodoListProps {
  todoList: ITodo[]
  editIndex: number
  setUpdateState: Dispatch<SetStateAction<boolean>>
  setEditIndex: Dispatch<SetStateAction<number>>
}
const TodoList: React.FC<TodoListProps> = observer(
  ({ todoList, editIndex, setEditIndex, setUpdateState }) => {
    return (
      <MDBListGroup>
        {todoList.map((item) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              setUpdateState={setUpdateState}
            />
          )
        })}
      </MDBListGroup>
    )
  },
)

export default TodoList
