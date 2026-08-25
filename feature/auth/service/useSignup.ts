import { router } from "expo-router";
import { useState } from "react";
import { AuthApi } from "../api/auth.api";
import { AuthStore } from "../store/authstore";
import { signupTypes } from "../types/signup.types";
export function useSignup(){
    const [loading, setloading] = useState<boolean>(false);
    const {setJwt,setRefreshToken,setUser,setVerified} = AuthStore()
    async function signup(data:signupTypes) {
        try {
            setloading(true);
            const response = await AuthApi.signup(data);
            if(response.status==201){
                console.log(response.data)
                setJwt(response.data.Bearer)
                setRefreshToken(response.data.RefreshToken)
                setUser({"userName":response.data.userName||"","userID":response.data.userId||"","role":"Rider"})
                setVerified(data.isVerfied)
                router.push('/locationallow')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
    }
    return{
        loading,
        signup
    }
}