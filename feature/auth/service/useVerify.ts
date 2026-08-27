import { router } from "expo-router";
import { useState } from "react";
import { AuthApi } from "../api/auth.api";
import { AuthStore } from "../store/authstore";
import { verifyOtpTypes } from "../types/verifyotp.types";
export function useVerify(){
    const [loading, setloading] = useState<boolean>(false);
    const {phoneNumber,setJwt,setUser,setRefreshToken} = AuthStore()
    async function verify(data:verifyOtpTypes){
        try {
            setloading(true);
            if(phoneNumber===null || "") throw Error("Phone number is null")
            const response = await AuthApi.verification(phoneNumber||"",data);
            if(response.status===201){
                //need to create user
                console.log(response.data)
                router.push('/signup')
            }else if(response.status===200){
                //user already exist
                console.log(response.data);
                setJwt(response.data.Bearer);
                setRefreshToken(response.data.RefreshToken)
                setUser({"userName":response.data.userName||"","userID":response.data.userId||"","role":"Driver"})
                router.push('/locationallow')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return{
        loading,
        phoneNumber,
        verify
    }
}