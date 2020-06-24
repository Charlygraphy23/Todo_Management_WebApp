import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik"
import AuthorizationServices from './AuthorizationServices.js'

class LoginPageComponent extends Component{

    constructor(props){
        super(props);

        this.state ={
            username : {},
            password : {},
            isLoginFailed : {}
        }

        this.onValidate=this.onValidate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState(
            {
                username : "dip",
                password : "d",
                isLoginFailed : false
            }
        )
    }


    onValidate(values){
        let error ={}

        if(!values.username){
            error.username="Please Enter Username"
        }
        else if(!values.password){
            error.username="Please Enter Password"
        }

        return error
    }

    onSubmit(values){

        AuthorizationServices.genarateToken(values.username,values.password).then(
            (response) => {
                AuthorizationServices.registerUser(values.username,response.data.token);
                this.props.history.push(`/welcome/${values.username}`);
            }
        ).catch(
            () => {
                this.setState(
                    {
                        isLoginFailed : true
                    }
                )
            }
        )


    }

    render(){
        return(
            <div className="loginPage">
                <div className="container">
                  <div className="display-4 h4 col justify-content-center">Login Page</div>  

                        <Formik
                            initialValues={{
                                username : this.state.username,
                                password : this.state.password
                            }}
                            validateOnBlur={false}
                            validateOnChange={false}
                            validate={this.onValidate}
                            onSubmit={this.onSubmit}
                            enableReinitialize={true}
                        >

                                    {
                                        (props) =>(
                                            <Form className =" container loginForm">
                                                {this.state.isLoginFailed && <div className="alert alert-warning"> Enter Correct <strong> Username </strong> and  <strong> Password </strong></div>}
                                                <ErrorMessage className="alert alert-warning" component="div" name="username"></ErrorMessage>
                                                <div className="form-group row justify-content-center">
                                                    <label className= "form-label col-md-2"> Username : </label>
                                                    <Field type="text" className="form-control col-md-7 usernameField" name="username" ></Field>
                                                </div>

                                                <div className="form-group row justify-content-center">
                                                    <label className= "form-label col-md-2"> Password : </label>
                                                    <Field type="password" className="form-control col-md-7 usernameField" name="password"></Field>
                                                </div>
                                                <div className="justify-content-center">
                                                     <button className="btn btn-primary loginButton " type="submit">Login</button>
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
export default LoginPageComponent;