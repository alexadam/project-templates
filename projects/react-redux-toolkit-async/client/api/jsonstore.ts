import axios from 'axios'
import {Todo} from '../features/todoList/types'

const URL = 'http://localhost:3030'

interface GetTodosResponse {
    result: Todo[],
    ok: boolean
}

export async function loadRemoteTodos(): Promise<Todo[]> {
    const response = await axios.get(URL, {
        headers: {
            'Access-Control-Allow-Origin': '*',
          }
    })
    return response.data
}

export async function saveRemoteTodos(todos: Todo[]) {
    await axios.post<Todo[]>(URL, todos, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
    });
}
