import React, {Component} from 'react';



class WelcomePageComponent extends Component{
    render(){
        return(
            <div className="todoappPage">
                <div className="container">
                  <div className="display-4 h4">Welcome Here {this.props.match.params.name} </div>  
                </div>
            </div>
        )
    }
}
export default WelcomePageComponent;