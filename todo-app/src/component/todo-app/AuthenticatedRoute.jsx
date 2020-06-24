import React ,{Component} from 'react'
import AuthenticationService from './AuthenticationServices.js'
import {Route, Redirect} from "react-router-dom"

class AuthentcatedRoute extends Component{
    render(){

        if(AuthenticationService.isLoggedin()){
            return <Route {...this.props}/>
        }
        return <Redirect to="/login"/>

    }
}
export default AuthentcatedRoute;