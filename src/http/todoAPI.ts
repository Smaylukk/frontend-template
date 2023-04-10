import { $authHost } from '.'

import userAPI from './userAPI'

const restApiTodo = '/api/todo'
export interface ITodo {
  id?: number
  title: string
  completed: boolean
  userId: number
}
class ToDoAPI {
  async getAllTodo(): Promise<ITodo[]> {
    await userAPI.check()
    const todos = await $authHost.get<{ count: number; rows: ITodo[] }>(restApiTodo)
    return todos.data.rows
  }

  async getOneTodo(id: number): Promise<ITodo> {
    await userAPI.check()
    const todos = await $authHost.get<ITodo>(`${restApiTodo}/${id}`)
    return todos.data
  }

  async createTodo(data: ITodo): Promise<ITodo> {
    await userAPI.check()
    const todos = await $authHost.post<ITodo>(restApiTodo, data)
    return todos.data
  }

  async changeTodo(id: number, data): Promise<ITodo> {
    await userAPI.check()
    const todos = await $authHost.put<ITodo>(`${restApiTodo}/${id}`, data)
    return todos.data
  }

  async deleteTodo(id: number): Promise<number> {
    await userAPI.check()
    const todos = await $authHost.delete(`${restApiTodo}/${id}`)
    return todos.data
  }
}
export default new ToDoAPI()
