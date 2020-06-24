import React, {Component} from 'react';
import './TodoApp.css'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import WelcomePageComponent from "./WelcomePageComponent.jsx"
import LoginPageComponent from "./LoginPageComponent.jsx"
import HeaderPageComponent from "./HeaderPageComponent.jsx"
import FooterPageComponent from "./FooterPageComponent.jsx"
import TodosPageComponent from "./TodosPageComponent.jsx"
import LogoutPageComponent from "./LogoutPageComponent.jsx"
import ErrorPageComponent from "./ErrorPageComponent.jsx"
import AuthenticationRouteService from "./AuthenticationRouteService.jsx"
import UpdateTodosPageComponent from "./UpdateTodosPageComponent.jsx"
import AddTodoPageComponent from "./AddTodoPageComponent.jsx"

class TodoAppComponent extends Component{
    render(){
        return(
            <div className="todoappPage">
                <div className="container">
                  
                    <Router>
                        <HeaderPageComponent/>
                            <Switch>
                                <Route path="/" exact component={LoginPageComponent}/>
                                <Route path="/login" component={LoginPageComponent}/>
                                <AuthenticationRouteService path="/welcome/:name" component={WelcomePageComponent}/>
                                <AuthenticationRouteService path="/todos/add" component={AddTodoPageComponent}/>
                                <AuthenticationRouteService path="/todos/:id" component={UpdateTodosPageComponent}/>
                                <AuthenticationRouteService path="/todos" component={TodosPageComponent}/>
                                <AuthenticationRouteService path="/logout" component={LogoutPageComponent}/>
                                <Route  component={ErrorPageComponent}/>
                            </Switch> 
                        <FooterPageComponent/>
                    </Router>

                </div>
            </div>
        )
    }
}
export default TodoAppComponent;