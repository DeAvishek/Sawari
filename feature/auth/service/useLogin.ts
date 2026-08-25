import { router } from "expo-router";
import { useState } from "react";
import { AuthApi } from "../api/auth.api";
import { AuthStore } from "../store/authstore";
import { loginTypes } from "../types/login.types";
export function useLogin() {
    const[loading,setLoading] = useState<boolean>(false)
    const {setPhoneNumber} = AuthStore()
    async function login(data: loginTypes) {
        try {
            setLoading(true)
            if (data == null) throw new Error("data is null")
            const response = await AuthApi.login(data)
            console.log(response.data)
            setPhoneNumber(response.data.phoneNumber)
            if(response.status===200){
                setTimeout(() => {
                    router.push("/verification")
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }finally{
            console.log("loading set to false for login")
            setLoading(false)
        }
    }
    return {
        login,
        loading,
    };
}