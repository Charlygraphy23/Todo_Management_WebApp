import React, {Component} from 'react';



class ErrorPageComponent extends Component{

    // constructor(props){
    //     super(props);

    //     this.state={
    //         date : "2002-02-15"
    //     }
    //     this.formatdate=this.formatdate.bind(this);
    // }

    render(){
        return(
            <div className="errorPAge">
                <div className="container">
                  <div className="display-4 h4">Error</div>  
                   {/* {console.log(this.formatdate())} */}
                </div>
            </div>
        )
    }

    // formatdate(){
    //     // var dt1 =  moment(new Date(this.state.date)).format("yyyy-MM-DD");
    //     // var dt2 =  moment(new Date()).format("yyyy-MM-DD");
        

    //     var msDiff = new Date("June 24, 2020") - new Date();    //Future date - current date
    //     var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    //     console.log(daysTill30June2035);
       
    // }
}

export default ErrorPageComponent;