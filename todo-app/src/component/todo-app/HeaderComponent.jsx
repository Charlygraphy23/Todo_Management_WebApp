import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationServices.js'
import {withRouter} from "react-router"


class HeaderComponent extends Component{

    render(){
        return(

            <div className="headerPage">
              <div className="container">

              <header>
                  <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                      <div className="navbar-brand">
                           <img src="https://media-exp1.licdn.com/dms/image/C560BAQHimHEolcTaGg/company-logo_200_200/0?e=2159024400&v=beta&t=DynFfr8vm4UR4TyGnfogs-BuqllztMuypHdTyw0cC3s" alt="Todo" width="40px"/> Todo
                           
                      </div>

                      <button className="navbar-toggler" data-toggle="collapse" data-target="#collapsibleNavbar">
                          <span className="navbar-toggler-icon"></span>
                      </button>

                     <div className="collapse navbar-collapse" id="collapsibleNavbar" >
                            <ul className="navbar-nav">
                                {AuthenticationService.isLoggedin() &&  <li className="nav-item"><Link className="nav-link" to={`/welcome/${AuthenticationService.getName()}`}>Home</Link> </li>}
                                {AuthenticationService.isLoggedin() && <li className="nav-item"><Link className="nav-link" to="/todos">Todos</Link></li>}
                            </ul>
                      
                             <ul className="navbar-nav navbar-collapse justify-content-end">
                                {!AuthenticationService.isLoggedin() && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link> </li>}
                                {AuthenticationService.isLoggedin() && <li className="nav-item"><Link className="nav-link" to="/logout" onClick={AuthenticationService.removeSession}>Logout</Link></li>}
                            </ul>

                     </div>

                        

                  </nav>
              </header>

              </div>
            </div>

        )
    }

}
export default withRouter(HeaderComponent);