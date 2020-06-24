import React,{Component} from 'react'


class WelcomePageComponent extends Component{

    render(){
        return(

            <div className="welcomePage">
                <div className="container">
                      <h1 className="display-4">  Welcome Here {this.props.match.params.name}</h1>
                </div>
              
            </div>

        )
    }

}
export default WelcomePageComponent;