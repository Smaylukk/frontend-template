import todoAPI from '../http/todoAPI'
import { Dispatch, SetStateAction, useCallback, useContext } from 'react'
import { Context } from '../index'
import { UserType } from '../store/UserStore'

type UseTodoTuple = [
  addTodoHandler: (newTodo: string) => Promise<void>,
  deleteTodoHandler: (id: number) => Promise<void>,
  editTodoButtonHandler: (index: number) => void,
  editTodoHandler: (editTodo: string, editIndex: number) => Promise<void>,
  cancelEditTodoHandler: () => void,
  toggleCompletedTodoHandler: (id: number, currentStateCompleted: boolean) => Promise<void>,
]
const useTodo = (
  setUpdateState: Dispatch<SetStateAction<boolean>>,
  setEditIndex: Dispatch<SetStateAction<number>>,
): UseTodoTuple => {
  const { userStore } = useContext(Context) as UserType
  const addTodoHandler = useCallback(async (newTodo: string) => {
    await todoAPI.createTodo({
      title: newTodo,
      completed: false,
      userId: userStore.user.id,
    })
    setUpdateState(true)
  }, [])
  const deleteTodoHandler = useCallback(async (id: number) => {
    await todoAPI.deleteTodo(id)
    setUpdateState(true)
  }, [])
  const editTodoButtonHandler = useCallback((index: number) => {
    setEditIndex(index)
  }, [])
  const editTodoHandler = useCallback(async (editTodo: string, editIndex: number) => {
    const data = { title: editTodo }
    await todoAPI.changeTodo(editIndex, data)
    setEditIndex(-1)
    setUpdateState(true)
  }, [])
  const cancelEditTodoHandler = useCallback(() => {
    setEditIndex(-1)
    setUpdateState(true)
  }, [])
  const toggleCompletedTodoHandler = useCallback(
    async (id: number, currentStateCompleted: boolean) => {
      const data = { completed: !currentStateCompleted }
      await todoAPI.changeTodo(id, data)
      setUpdateState(true)
    },
    [],
  )

  return [
    addTodoHandler,
    deleteTodoHandler,
    editTodoButtonHandler,
    editTodoHandler,
    cancelEditTodoHandler,
    toggleCompletedTodoHandler,
  ]
}

export default useTodo
