import React , {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoServices from '../../api/todo/TodoServices';

class TodoAddComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            listofTasks :[],
            isCompleted : ""
        }

        this.handleChange=this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.validate=this.validate.bind(this);
    }


    handleChange(e){
        if(e.target.name==="tTrue"){          
           this.setState({
               isCompleted : true
           })
        }
        else if(e.target.name ==="tfalse"){
            this.setState({
                isCompleted : false
            })
        }
    }

    onSubmit(values){
       TodoServices.saveTodo(this.props.match.params.name,{
           tasks : values.tAdd,
           date : values.dAdd,
           complete : this.state.isCompleted
       }).then(response => this.props.history.push("/todos"))
    }


    validate(values){
        let error ={}

        if(!values.tAdd){
            error.tAdd="Enter tasks properly"
        }
        else if(!values.dAdd){
            error.tAdd="Enter Date properly"
        }

        return error
    }

        render(){
            return(
                <div className="todoaddpage">
                    <h3 className="h3 display-3 col">Add Todos Here</h3>
                    <div className="container">
                    <Formik
                        initialValues={{
                            tAdd : "",
                            dAdd : "",
                            tTrue : this.state.isCompleted,
                            tfalse : !this.state.isCompleted
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}
                    >
                                        {
                                            (props)=> (
                                                <Form className ="form" >
                                                    <ErrorMessage component="div" className="alert alert-warning" name="tAdd"></ErrorMessage>
                                                    <div className="row justify-content-center form-group">
                                                        <div className="col-md-2">
                                                            <label>Tasks : </label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Field className="form-control" type="text" name="tAdd"></Field>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-center form-group">
                                                        <div className="col-md-2">
                                                            <label>Date : </label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Field className="form-control" type="date" name="dAdd"></Field>
                                                        </div>
                                                    </div>
    
                                                    <fieldset className="form-group">
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                               True <Field className="form-check-input" type="checkbox" name="tTrue" onChange={this.handleChange}></Field>
                                                            </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                               False <Field className="form-check-input" type="checkbox" name="tfalse" onChange={this.handleChange}></Field>
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
            )

        }
}
export default TodoAddComponent;