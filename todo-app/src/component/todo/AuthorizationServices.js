import axios from 'axios'

class AuthorizationServices{

    genarateToken(username,password){
        return axios.post('http://localhost:8080/authenticate',{
            username,password
        })
    }

    executeAuthentication(token){
        return "Bearer "+token
    }

    executeInterceptor(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedin()){
                    config.headers.authorization = token
                }
                return config;
            }
        )
    }


    registerUser(username,token){
        sessionStorage.setItem('authenticateUser',username);
        this.executeInterceptor(this.executeAuthentication(token));
    }

    isUserLoggedin(){
        let check=sessionStorage.getItem('authenticateUser');

        if(check!== null){
            return true;
        }
        return false
    }

    getUsername(){
        if(this.isUserLoggedin()){
            return sessionStorage.getItem('authenticateUser');
        }
    }

    removeUser(){
        sessionStorage.removeItem('authenticateUser')
    }



}

export default new AuthorizationServices();