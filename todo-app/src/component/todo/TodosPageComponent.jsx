import React, {Component} from 'react';
import TodoAppServices from "../../api/todo/TodoAppServices.js"
import AuthorizationServices from './AuthorizationServices.js'
class TodosPageComponent extends Component{

    constructor(props){
        super(props);

        this.state ={
            list : [],
        }
        this.handleAddButton=this.handleAddButton.bind(this);
        this.deleteTodo=this.deleteTodo.bind(this);
        this.refreshList=this.refreshList.bind(this);
    }

    componentDidMount(){
       this.refreshList();
    }

    refreshList(){
        TodoAppServices.getAllTodos(AuthorizationServices.getUsername()).then(
            (response) => {
                this.setState(
                    {
                        list : response.data
                    }
                )
            }
        )
    }

    updatePage(id){
            this.props.history.push(`/todos/${id}`)
    }

    deleteTodo(id){
        TodoAppServices.deleteTodo(this.props.match.params.name,id).then(
            () => this.refreshList()
        )
    }

    handleAddButton(){
    
        this.props.history.push(`/todos/add`)
    }

    render(){
        return(
            <div className="todoappPage">
                <div className="container">
                  <div className="display-4 h4 todosH4">Todos</div>  
                    <div className ="tableContainer table-responsive-md">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tasks</th>
                                <th>isDone</th> 
                                <th>Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                                </tr>
                        </thead>

                        <tbody>
                            {this.state.list.map(
                                (todos) =>  <tr key={todos.id}>
                                <td>{todos.id}</td>
                                <td>{todos.tasks}</td>
                                <td>{todos.complete.toString()}</td>
                                <td>{todos.date}</td>
                                <td><button className="btn btn-warning" onClick={()=> this.updatePage(todos.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                <td><button className="btn btn-danger" onClick={()=> this.deleteTodo(todos.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                            </tr>
                            )}
                        
                        </tbody>
                    </table>
                    </div>
                    <div className="addButton">
                        <button className="btn btn-primary addbtn" onClick={this.handleAddButton}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default TodosPageComponent;