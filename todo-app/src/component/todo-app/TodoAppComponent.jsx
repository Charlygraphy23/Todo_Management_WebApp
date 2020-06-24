import React,{Component} from 'react';
import './TodoApp.css';
import {BrowserRouter as Router , Route, Switch} from "react-router-dom"
import HeaderComponent from "./HeaderComponent.jsx";
import LoginPageComponent from "./LoginPageComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import TodoPageComponent from "./TodoPageComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx"
import WelcomePageComponent from "./WelcomePageComponent.jsx";
import AuthentcatedRoute from "./AuthenticatedRoute.jsx";
import TodoAddComponent from "./TodoAddComponent.jsx"


class TodoAppComponent extends Component{

    render(){
        return(

            <div className="todoApp">
               <Router>
                   <HeaderComponent/>
                   <Switch>
                       <Route path="/login" component={LoginPageComponent}/>
                       <AuthentcatedRoute path="/Welcome/:name" component={WelcomePageComponent}/>
                       <Route path="/"  exact component={LoginPageComponent}/>
                       <AuthentcatedRoute path="/todos/add" component={TodoAddComponent}/>
                       <AuthentcatedRoute path="/todos" component={TodoPageComponent}/>
                       <AuthentcatedRoute path="/logout" component={LogoutComponent}/>
                       <Route component={ErrorComponent}/>
                   </Switch>
                   <FooterComponent/>
               </Router>
            </div>

        )
    }

}
export default TodoAppComponent;