import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, ListGroup, Pagination, Row } from 'react-bootstrap'
import TodoAPI, { ITodo } from '../http/todoAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import todoAPI from '../http/todoAPI'
import { Context } from '../index'
import { UserType } from '../store/UserStore'

const itemsPagination: JSX.Element[] = []
const Home = observer(() => {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [updateState, setUpdateState] = useState(true)
  const { userStore } = useContext(Context) as UserType

  useEffect(() => {
    if (updateState) {
      TodoAPI.getAllTodo().then((data) => {
        setTodoList(data)
      })
      setUpdateState(false)
    }
  }, [updateState])

  const addTodoHandler = async () => {
    await todoAPI.createTodo({
      title: newTodo,
      completed: false,
      userId: userStore.user.id,
    })
    setUpdateState(true)
    setNewTodo('')
  }
  const deleteTodoHandler = async (id: number) => {
    await todoAPI.deleteTodo(id)
    setUpdateState(true)
  }

  return (
    <Container>
      <header className='mt-2' role='banner'>
        <h2>Публікації:</h2>
      </header>
      <main className='mt-auto' role='main'>
        <InputGroup>
          <Form.Control
            type='text'
            id='newTodo'
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value)
            }}
          />
          <Button variant='primary' onClick={addTodoHandler}>
            Add new todo
          </Button>
        </InputGroup>
        <Container className={'todo-list'} fluid>
          <Row>
            <ListGroup>
              {todoList.map((el) => {
                return (
                  <ListGroup.Item key={el.id} className={'d-flex justify-content-between'} action>
                    {el.title}
                    <div className={'mr-auto'}>
                      <FontAwesomeIcon
                        className={'mx-2'}
                        icon={el.completed ? 'square-check' : 'square-minus'}
                      />
                      <FontAwesomeIcon className={'mx-2'} icon={'pen'} />
                      <FontAwesomeIcon
                        icon={'trash'}
                        onClick={async () => {
                          await deleteTodoHandler(el.id!)
                        }}
                      />
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Row>
        </Container>
        <Pagination className='d-flex justify-content-end'>{itemsPagination}</Pagination>
      </main>
    </Container>
  )
})

export default Home
