import React ,{Component} from 'react';
import AuthorizationServices from './AuthorizationServices.js'
import { Route, Redirect } from 'react-router-dom';

class AuthenticationRouteService extends Component{
    render(){
        if(AuthorizationServices.isUserLoggedin()){
            return <Route {...this.props}/>
        }

        return <Redirect to="/login"/>
    }
}

export default AuthenticationRouteService;