import axios from 'axios'

class TodoAppServices {

    getAllTodos(username){
        return axios.get(`http://localhost:8080/jpa/users/${username}/todos`)
    }

    getTodobyId(username,id){
        return axios.get(`http://localhost:8080/jpa/users/${username}/todos/${id}`)
    }

    updateTodo(username,id,todo){
        return axios.put(`http://localhost:8080/jpa/users/${username}/todos/${id}`,todo)
    }

    addTodos(username,todo){
        return axios.post(`http://localhost:8080/jpa/users/${username}/todos/`,todo)
    }

    deleteTodo(username,id){
        return axios.delete(`http://localhost:8080/jpa/users/${username}/todos/${id}`)
    }
}
export default new TodoAppServices();