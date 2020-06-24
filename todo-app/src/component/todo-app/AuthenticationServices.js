import axios from 'axios'

class AuthenticationService {

    // createBasicAuthToken(username,password){
    //     return "Basic "+window.btoa(username+":"+password); 
    //  }

     
    
    // executeBasicAuthentication(username,password){
    //     return axios.get(`http://localhost:8080/basicauth`, 
    //     {
    //         headers : {
    //             authorization : this.createBasicAuthToken(username,password)
    //         }
    //     });
    // }

    //   getService(username,password){

    //     sessionStorage.setItem('authenticateduser',username)
    //     this.setupAxiosinterseptor(this.createBasicAuthToken(username,password));
    //   }

    createJwtToken(token){
        return "Bearer "+token
    }

    executeJwtAuthentication(username,password){
        return axios.post(`http://localhost:8080/authenticate`, 
        {
           username,password
        });
    }

    getJwtService(username,token){
        sessionStorage.setItem('authenticateduser',username)
        this.setupAxiosinterseptor(this.createJwtToken(token));
      }

    

      getName(){
          let name=sessionStorage.getItem('authenticateduser')
         if(name!==null)
         {
             return name;
         }
         return null;
      }

      isLoggedin(){
        let name=sessionStorage.getItem('authenticateduser')
        if(name!==null)
        {
            return true;
        }
        return false;
      }

      removeSession(){
          sessionStorage.removeItem('authenticateduser');
      }


      setupAxiosinterseptor(token){

        axios.interceptors.request.use(
            (config) => {
                if(this.isLoggedin()){
                    config.headers.authorization = token
                }
                return config;
            }
        )
    }
}
export default new AuthenticationService();