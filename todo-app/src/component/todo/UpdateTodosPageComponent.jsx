import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage}  from 'formik'
import TodoAppServices from "../../api/todo/TodoAppServices.js"
import AuthorizationServices from './AuthorizationServices.js'

class UpdateTodosPageComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            id : {},
            tasks : {},
            date : {},
            isDone : {}
        }

        this.handleRadioButtons=this.handleRadioButtons.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onValidate=this.onValidate.bind(this);
    }

    componentDidMount(){
        TodoAppServices.getTodobyId(AuthorizationServices.getUsername(),this.props.match.params.id).then(
            (response) =>{
               this.setState(
                   {
                       id : response.data.id,
                       tasks : response.data.tasks,
                       isDone : response.data.complete,
                       date : response.data.date
                   }
               )
            }
        )


    }

    handleRadioButtons(e){
            if(e.target.id === "true"){
                this.setState(
                    {
                        isDone : true
                    }
                )
            }
            else if(e.target.id === "false"){
                this.setState(
                    {
                        isDone : false
                    }
                )
            }
    }

    onValidate(values){
        this.setState(
           {
            tasks : values.tasksText,
            isDone :  this.state.isDone,
            date : values.dateText,
           }
        )

        let error ={};

        if(!values.tasksText){
            error.tasksText="Please enter some task"
        }
        else if(!values.dateText){
            error.tasksText="Please enter a date"
        }

        return error;
    }

    onSubmit(values){
        TodoAppServices.updateTodo(this.props.match.params.name,this.props.match.params.id,{
            id : this.props.match.params.id,
            tasks : values.tasksText,
            date : values.dateText,
            complete : this.state.isDone
        }).then(
          ()=> {
              this.props.history.push("/todos")
          }
        )
    }

    render(){
        return(
            <div className="updatePage">
                <div className="container">
                    <div className="display-4 h4 titleUpdatePage col">Update Todos</div>

                    <Formik
                        initialValues ={{
                            tasksText : this.state.tasks,
                            dateText : this.state.date,
                            isComplete : this.state.isDone,
                            isnComplete : !this.state.isDone,
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.onValidate}
                        validateOnBlur={false}  
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                
                                <Form className="form container" onChange={this.handleRadioButtons} >
                                    <ErrorMessage className="alert alert-warning" component="div" name="tasksText"/>
                                    <div className="form-group form-inline row justify-content-center">
                                        <label className="form-labe col-md-4">Tasks : </label>
                                        <Field className="form-control col-md-8" type="text" name="tasksText"/>
                                    </div>
                                    <div className="form-group form-inline row justify-content-center">
                                        <label className="form-labe col-md-4">Date : </label>
                                        <Field className="form-control col-md-8" type="date" name="dateText"/>
                                    </div>

                                    <div className="justify-content-center  ">
                                        <div className="form-check-inline  ">
                                            <label className="form-check-label formlbl "> True :  </label>
                                            <Field className="form-check-input  " type="checkbox" name="isComplete" id="true"/>
                                        </div>

                                        <div className="form-check-inline ">
                                            <label className="form-check-label formlbl">False : </label>
                                            <Field className="form-check-input " type="checkbox" name="isnComplete" id="false" />
                                        </div>
                                    </div>
                                    <div >
                                        <button className="btn btn-success updateButton" type="submit">Update</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}
export default UpdateTodosPageComponent;