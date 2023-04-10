import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap'
import TodoAPI, { ITodo } from '../http/todoAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import todoAPI from '../http/todoAPI'
import { Context } from '../index'
import { UserType } from '../store/UserStore'

const Home = observer(() => {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [updateState, setUpdateState] = useState(true)
  const [editIndex, setEditIndex] = useState(-1)
  const [editTodo, setEditTodo] = useState('')
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
  const editTodoHandler = async () => {
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
        <InputGroup>
          <Form.Control
            type='text'
            id='newTodo'
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value)
            }}
          />
          <Button className={'mx-1'} variant='primary' onClick={addTodoHandler}>
            Додати
          </Button>
        </InputGroup>
        <Container className={'todo-list'} fluid>
          <Row>
            <ListGroup>
              {todoList.map((el) => {
                if (editIndex === el.id) {
                  return (
                    <ListGroup.Item key={el.id} className={'d-flex justify-content-between'}>
                      <InputGroup>
                        <Form.Control
                          type='text'
                          id='newTodo'
                          value={editTodo}
                          onChange={(e) => {
                            setEditTodo(e.target.value)
                          }}
                        />
                        <Button className={'mx-1'} variant='primary' onClick={editTodoHandler}>
                          Зберегти
                        </Button>
                        <Button variant='danger' onClick={cancelEditTodoHandler}>
                          Відміна
                        </Button>
                      </InputGroup>
                    </ListGroup.Item>
                  )
                } else {
                  return (
                    <ListGroup.Item
                      key={el.id}
                      className={`d-flex justify-content-between todoItem ${
                        el.completed ? 'completedState' : ''
                      }`}
                    >
                      {el.title}
                      <div className={'mr-auto'}>
                        <FontAwesomeIcon
                          color={'blue'}
                          className={'todoItemButton'}
                          icon={el.completed ? 'square-check' : 'square-minus'}
                          onClick={async () => {
                            await toggleCompletedTodoHandler(el.id!, el.completed)
                          }}
                        />
                        <FontAwesomeIcon
                          className={'mx-2 todoItemButton'}
                          color={'green'}
                          icon={'pen'}
                          onClick={() => {
                            setEditTodo(el.title)
                            setEditIndex(el.id!)
                          }}
                        />
                        <FontAwesomeIcon
                          className={'todoItemButton'}
                          icon={'trash'}
                          color={'red'}
                          onClick={async () => {
                            await deleteTodoHandler(el.id!)
                          }}
                        />
                      </div>
                    </ListGroup.Item>
                  )
                }
              })}
            </ListGroup>
          </Row>
        </Container>
      </main>
    </Container>
  )
})

export default Home
