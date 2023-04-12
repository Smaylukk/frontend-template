import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import TodoAPI, { ITodo } from '../http/todoAPI'
import todoAPI from '../http/todoAPI'
import { Context } from '../index'
import { UserType } from '../store/UserStore'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

const Home = observer(() => {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  const [updateState, setUpdateState] = useState(true)
  const [editIndex, setEditIndex] = useState(-1)
  const { userStore } = useContext(Context) as UserType

  useEffect(() => {
    if (updateState) {
      TodoAPI.getAllTodo().then((data) => {
        setTodoList(data)
      })
      setUpdateState(false)
    }
  }, [updateState])

  const addTodoHandler = async (newTodo: string) => {
    await todoAPI.createTodo({
      title: newTodo,
      completed: false,
      userId: userStore.user.id,
    })
    setUpdateState(true)
  }
  const deleteTodoHandler = async (id: number) => {
    await todoAPI.deleteTodo(id)
    setUpdateState(true)
  }
  const editTodoButtonHandler = (index: number) => {
    setEditIndex(index)
  }
  const editTodoHandler = async (editTodo: string) => {
    const data = { title: editTodo }
    await todoAPI.changeTodo(editIndex, data)
    setEditIndex(-1)
    setUpdateState(true)
  }
  const cancelEditTodoHandler = () => {
    setEditIndex(-1)
    setUpdateState(true)
  }
  const toggleCompletedTodoHandler = async (id: number, currentStateCompleted: boolean) => {
    const data = { completed: !currentStateCompleted }
    await todoAPI.changeTodo(id, data)
    setUpdateState(true)
  }

  return (
    <Container>
      <header className='mt-2' role='banner'>
        <h2>Список завдань:</h2>
      </header>
      <main className='mt-auto' role='main'>
        <AddTodo addTodoHandler={addTodoHandler} />
        <Container className={'todo-list'} fluid>
          <Row>
            <TodoList
              todoList={todoList}
              editIndex={editIndex}
              deleteTodoHandler={deleteTodoHandler}
              editTodoHandler={editTodoHandler}
              cancelEditTodoHandler={cancelEditTodoHandler}
              toggleCompletedTodoHandler={toggleCompletedTodoHandler}
              editTodoButtonHandler={editTodoButtonHandler}
            />
          </Row>
        </Container>
      </main>
    </Container>
  )
})

export default Home
