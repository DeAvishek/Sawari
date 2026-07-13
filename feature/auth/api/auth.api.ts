import { Server } from "@/core/Server";
import { ENDPOINTS } from "@/core/api/auth/Endpoints";
import { loginTypes } from "../types/login.types";
import { signupTypes } from "../types/signup.types";
import { verifyotpTypes } from "../types/verifyotp.types";
export class AuthApi{
    static login(data:loginTypes){
        console.log("Request has benn made to",Server.defaults.baseURL+ENDPOINTS.Auth.login);
        return Server.post(ENDPOINTS.Auth.login,data);
    }
    static signup(data:signupTypes){
        console.log("Request has been made to",Server.defaults.baseURL+ENDPOINTS.Auth.signup);
        return Server.post(ENDPOINTS.Auth.signup,data);
    }
    static verification(phoneNumber:string,data:verifyotpTypes){
        console.log("Request has been made to",Server.defaults.baseURL+ENDPOINTS.Auth.verification(phoneNumber));
        return Server.post(ENDPOINTS.Auth.verification(phoneNumber),data);
    }
    static refreshToken(token:string){
        return Server.post(ENDPOINTS.Auth.refreshToken(token))
    }
}