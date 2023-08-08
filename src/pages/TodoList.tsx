import { observer } from 'mobx-react-lite'
import React from 'react'
import { ITodo } from '../http/todoAPI'
import TodoItem from './TodoItem'
import { MDBListGroup } from 'mdb-react-ui-kit'

interface TodoListProps {
  todoList: ITodo[]
  editIndex: number
  deleteTodoHandler: (id: number) => Promise<void>
  editTodoHandler: (editTodo: string) => Promise<void>
  cancelEditTodoHandler: () => void
  toggleCompletedTodoHandler: (id: number, currentStateCompleted: boolean) => Promise<void>
  editTodoButtonHandler: (editIndex: number) => void
}
const TodoList: React.FC<TodoListProps> = observer(
  ({
    todoList,
    editIndex,
    editTodoHandler,
    deleteTodoHandler,
    cancelEditTodoHandler,
    toggleCompletedTodoHandler,
    editTodoButtonHandler,
  }) => {
    return (
      <MDBListGroup>
        {todoList.map((item) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              editIndex={editIndex}
              deleteTodoHandler={deleteTodoHandler}
              editTodoHandler={editTodoHandler}
              cancelEditTodoHandler={cancelEditTodoHandler}
              toggleCompletedTodoHandler={toggleCompletedTodoHandler}
              editTodoButtonHandler={editTodoButtonHandler}
            />
          )
        })}
      </MDBListGroup>
    )
  },
)

export default TodoList
