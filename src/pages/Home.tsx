import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import TodoAPI, { ITodo } from '../http/todoAPI'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import { Box, Container } from '@mui/material'
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
    <Container component='main'>
      <header className='mt-2' role='banner'>
        <h2>Список завдань:</h2>
      </header>
      <AddTodo addTodoHandler={addTodoHandler} />
      <Container className={'todo-list'}>
        <Box>
          <TodoList
            todoList={todoList}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            setUpdateState={setUpdateState}
          />
        </Box>
      </Container>
    </Container>
  )
})

export default Home
