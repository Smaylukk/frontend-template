import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import TodoAPI, { ITodo } from '../http/todoAPI'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import { Box, Container, Heading } from '@chakra-ui/react'
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
    <Container maxW='80%'>
      <Heading className='mt-2' role='banner'>
        <h2>Список завдань:</h2>
      </Heading>
      <AddTodo addTodoHandler={addTodoHandler} />
      <Box className={'todo-list'}>
        <TodoList
          todoList={todoList}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          setUpdateState={setUpdateState}
        />
      </Box>
    </Container>
  )
})

export default Home
