import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction } from 'react'
import { List } from '@chakra-ui/react'
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
      <List>
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
      </List>
    )
  },
)

export default TodoList
