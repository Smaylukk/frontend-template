import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction } from 'react'
import { ListGroup } from 'react-bootstrap'
import { ITodo } from '../http/todoAPI'
import TodoItem from './TodoItem'

interface TodoListProps {
  todoList: ITodo[]
  editIndex: number
  setUpdateState: Dispatch<SetStateAction<boolean>>
  setEditIndex: Dispatch<SetStateAction<number>>
}
const TodoList: React.FC<TodoListProps> = observer(
  ({ todoList, editIndex, setEditIndex, setUpdateState }) => {
    return (
      <ListGroup>
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
      </ListGroup>
    )
  },
)

export default TodoList
