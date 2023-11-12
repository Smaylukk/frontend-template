import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import TodoAPI, { ITodo } from '../http/todoAPI'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import useTodo from '../hooks/useTodo'

const Home = observer(() => {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  const [updateState, setUpdateState] = useState(true)
  const [editIndex, setEditIndex] = useState(-1)
  const [addTodoHandler] = useTodo(setUpdateState, setEditIndex)

  useEffect(() => {
    if (updateState) {
      TodoAPI.getAllTodo().then((data) => {
        setTodoList(data)
      })
      setUpdateState(false)
    }
  }, [updateState])

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
              setEditIndex={setEditIndex}
              setUpdateState={setUpdateState}
            />
          </Row>
        </Container>
      </main>
    </Container>
  )
})

export default Home
