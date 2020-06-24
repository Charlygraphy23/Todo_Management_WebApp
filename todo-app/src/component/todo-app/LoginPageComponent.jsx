import React,{Component} from 'react'
import {Formik, Field, Form, ErrorMessage} from "formik"
import AuthenticationService from './AuthenticationServices.js'


class LoginPageComponent extends Component{


    constructor(props){
        super(props);

        this.state={
            username : {},
            password : {},
            isLoginfailed : false
        }

        this.handleValidate=this.handleValidate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState(
            {
                username :"dip",
                password : "d",
            }
        )
    }

    handleValidate(values){
        let error={}

        if(!values.username){
            error={username :"Please Enter Username" }
        }
        else if(!values.password){
            error={username :"Please Enter Password" }
        }
    
        return error;
    }

    onSubmit(values){
            
            // AuthenticationService.executeBasicAuthentication(values.username,values.password).then(
            //     () => {
            //         AuthenticationService.getService(values.username,values.password);
            //         this.props.history.push(`/welcome/${values.username}`)
            //     }
            // ).catch (
            //     () =>   this.setState(
            //         {
            //             isLoginfailed : true
            //         }
            //     )
            // )

            AuthenticationService.executeJwtAuthentication(values.username,values.password).then(
                (response) => {
                    AuthenticationService.getJwtService(values.username,response.data.token)
                    this.props.history.push(`/welcome/${values.username}`)
                }
            ).catch (
                    () =>   this.setState(
                        {
                            isLoginfailed : true
                        }
                    )
                )
    }

    render(){

        let {username,password}=this.state
        return(

            <div className="loginPage">
                <div className="container">

                    <Formik
                        initialValues={
                            {
                               username,password
                            }
                        }
                        enableReinitialize={true}
                        validate={this.handleValidate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={this.onSubmit}
                    >

                        {
                            (props)=>(

                               <Form>
                                <ErrorMessage className="alert alert-warning" component="div" name="username"></ErrorMessage>
                                { this.state.isLoginfailed && <div className="alert alert-warning" >Please enter currect <strong>Username</strong> or <strong>Password</strong> </div>}
                                <fieldset className="form-group">

                                    <div className="row justify-content-center">
                                        <div className="col-sm-2">
                                           <label>Username : </label>
                                        </div>
                                        <div className="col-sm-4">
                                           <Field className="form-control usrnameText" type="text" placeholder="Enter Username" name="username" ></Field>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="form-group">

                                    <div className="row justify-content-center">
                                       <div className="col-sm-2">
                                          <label>Password : </label>
                                        </div>
                                       <div className="col-sm-4">
                                          <Field className="form-control usrnameText" type="password" placeholder="Enter Password" name="password"></Field>
                                       </div>
                                    </div>
                                </fieldset>


                                <button type="submit" className="btn btn-primary loginBtn">Login</button>

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