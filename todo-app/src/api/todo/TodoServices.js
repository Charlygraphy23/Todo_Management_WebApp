import axios from 'axios'

class TodoServices {

    getAllTodos(username,password){
       return axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    deleteTodobyId(username,id){
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`)
    }

    updateTodobyId(username,id,todo){
        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`,todo)
    }

    saveTodo(username,todo){
        return axios.post(`http://localhost:8080/users/${username}/todos`,todo)
    }

}
export default new TodoServices();