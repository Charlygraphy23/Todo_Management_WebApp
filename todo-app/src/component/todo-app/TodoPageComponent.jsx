import React,{Component} from 'react'
import TodoServices from '../../api/todo/TodoServices.js'
import {Formik, Form, Field, ErrorMessage} from 'formik'


class TodoPageComponent extends Component{

    constructor(props){
        super(props);

        this.state={
           listOfTask : [],
           deleteMessage : false,
           taskid : {},
           isComplete : {},
           isSuccessfullySubmitted : false
        }
        this.deleteTodobyId=this.deleteTodobyId.bind(this);
        this.refreshList=this.refreshList.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.validate=this.validate.bind(this);
        this.addTasks=this.addTasks.bind(this);
    }

    componentDidMount(){
       this.refreshList();
    }

    refreshList(){
        TodoServices.getAllTodos(this.props.match.params.name).then(response => 
            {
                this.setState(
                    {
                        listOfTask : response.data
                    }
                )
                
            })
    }

    deleteTodobyId(id){
        TodoServices.deleteTodobyId(this.props.match.params.name,id).then(response => {
            this.refreshList();
        })
        this.setState({
            deleteMessage : true,
            taskid : id
        })
    }

    updateTodobyId(id){
        this.refreshList();
            this.setState(
                {
                    taskid : id,
                    isComplete : this.state.listOfTask[id-1].complete
                }
            )
    }

    handleChange(e){
        if(e.target.name==="isTrue"){
            this.setState({
                isComplete : true
            })
        }
        else if(e.target.name ==="isFalse"){
            this.setState({
                isComplete :false
            })
        }
    }

    onSubmit(values){
           TodoServices.updateTodobyId(this.props.match.params.name,values.taskid,{
               id : values.taskid,
               tasks : values.taskField,
               date : values.dateField,
               complete: this.state.isComplete
           }).then(response => {
               this.refreshList();
               this.setState({
                   isSuccessfullySubmitted : true
               })
           })
    }

    validate(values){
        let error ={}

        if(!values.taskField){
            error.taskField="Enter tasks properly"
        }
        else if(!values.dateField){
            error.taskField="Enter Date properly"
        }

        return error
    }

    addTasks(){
            this.props.history.push("/todos/add");
    }
  

    render(){
        return(

            <div className="todos">
                <div className="container">
                     { this.state.deleteMessage && <div className="alert alert-success">{`No - ${this.state.taskid} has deleted successfully`}
                         <i className="fa fa-check checkTik" aria-hidden="true"></i>
                     </div>}

                    <div className="scrolable">
                    <table className="table table-striped table-fixed"> 
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Id</th>
                                <th>Tasks</th>
                                <th>Done</th>
                                <th>Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listOfTask.map(
                                    todos=>  <tr key={todos.id}>
                                    <td>{todos.id}</td>
                                    <td>{todos.tasks}</td>
                                    <td>{todos.complete.toString()}</td>
                                    <td>{todos.date}</td>
                                    <td>
                                       <div className="dropdown">
                                       <button className="btn btn-warning updateButton"  onClick={()=> this.updateTodobyId(todos.id)} data-toggle="dropdown"><i className="fa fa-pencil-square-o"></i></button>

                                        <div className="container formPane">
                                            <div className="dropdown-menu">

                                                <Formik
                                                        initialValues={{
                                                            taskid : todos.id,
                                                            taskField : todos.tasks,
                                                            dateField : todos.date,
                                                            isTrue : this.state.isComplete,
                                                            isFalse : !this.state.isComplete
                                        
                                                        }}
                                                        validateOnBlur={false}
                                                        validateOnChange={false}
                                                        validate={this.validate}
                                                        onSubmit={this.onSubmit}
                                                        enableReinitialize={true}
                                                        
                                                        
                                                >
                                                        {
                                                           (props) =>(
                                                            
                                                                <Form className="form" >
                                                                  <ErrorMessage className="alert alert-warning" component="div" name="taskField"></ErrorMessage>
                                                                  {this.state.isSuccessfullySubmitted &&  <div className="alert alert-success">{`No - ${todos.id} has successfully updated`}</div>}
                                                                    <fieldset className="form-group">

                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-4">
                                                                                <label >Task : </label>
                                                                                </div>

                                                                                <div className="col-md-8">
                                                                                <Field className="form-control" type="text" name="taskField" />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                    </fieldset>
                                                                    <fieldset className="form-group">

                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-4">
                                                                                <label >Date : </label>
                                                                                </div>

                                                                                <div className="col-md-8">
                                                                                <Field className="form-control " type="date" name="dateField" />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                    </fieldset>

                                                                    <fieldset >

                                                                            <div className="form-check-inline ">
                                                                                <label className="form-check-label">
                                                                                   True  <Field className="form-check-input" type="checkbox" name="isTrue" onChange={this.handleChange}></Field>
                                                                                </label>
                                                                                
                                                                            </div>
                                                                            <div className="form-check-inline ">
                                                                               <label className="form-check-label">
                                                                                   False  <Field className="form-check-input" type="checkbox" name="isFalse" onChange={this.handleChange} ></Field>
                                                                                </label>
                                                                            </div>
                                                                            
                                                                    </fieldset>
                                                                    <button className="btn btn-primary" type="submit">Submit</button>

                                                                </Form>                                                                
                                                           )
                                                        }
                                                </Formik>

                                            </div>
                                        </div>

                                       </div>
                                    </td>
                                    <td><button className="btn btn-danger" onClick={()=> this.deleteTodobyId(todos.id)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div >
                    <div>
                         <button className="btn btn-primary" style={{position : "absolute", right : "0px",margin : "20px"}}  data-toggle="tooltip" title="Add Tasks Page"><i className="fa fa-plus" aria-hidden="true" onClick={this.addTasks}></i></button>
                    </div>

                </div>
            </div>

        )
    }

}
export default TodoPageComponent;