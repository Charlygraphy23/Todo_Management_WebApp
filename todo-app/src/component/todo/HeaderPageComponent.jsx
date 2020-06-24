import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AuthorizationServices from './AuthorizationServices.js'
import  {withRouter}  from "react-router"

class HeaderPageComponent extends Component{
    render(){
        return(
            <div className="headerPage">
                <div className="container">
                    <header>
                        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

                            <div className="navbar-brand">
                                <img src="https://cdn1.iconfinder.com/data/icons/rounded-set-6/48/todo-list-512.png" alt="Todo" width ="40px"></img> Todo
                            </div>

                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navMenuItem">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navMenuItem">
                            <ul className="navbar-nav"> 
                               { AuthorizationServices.isUserLoggedin() && <li className="nav-item"><Link className="nav-link" to={`/welcome/${AuthorizationServices.getUsername()}`}>Home</Link></li>}
                               { AuthorizationServices.isUserLoggedin() && <li className="nav-item"><Link className="nav-link"  to="/todos">Todos</Link></li>}
                            </ul>

                            <ul className="navbar-nav collapse navbar-collapse justify-content-end"> 
                                {!AuthorizationServices.isUserLoggedin() && <li className="nav-item"><Link className="nav-link"  to="/login">Login</Link></li>}
                                {AuthorizationServices.isUserLoggedin() && <li className="nav-item" onClick={AuthorizationServices.removeUser}><Link className="nav-link"  to="/logout">Logout</Link></li>}
                            </ul>
                            </div>

                        </nav>
                    </header>
                </div>
            </div>
        )
    }
}
export default withRouter(HeaderPageComponent);