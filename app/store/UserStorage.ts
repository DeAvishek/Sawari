import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type user={
    userName:string,
    role:string,
    verified:boolean;
}
type UserDataType={
    tempuserId:number|null,
    jwt_token:string|null,
    phone_number:string|null,
    user:user|null
}
type Actions={
    setTempUserId: (id: number) => void;
    setJwt:(jwt_token:string)=>void
    setUserPhoneNumber:(phno:string)=>void
    clearuserId:()=>void
    clearUserJwt:()=>void
    setUser:(User:user)=>void
    clearUser:()=>void
}
const UserDataStorage = create<UserDataType & Actions>()(
  persist(
    (set) => ({
      tempuserId:null,
      jwt_token:null,
      user:null,
      phone_number:null,
      
      setTempUserId: (id)=>set({tempuserId:id}),
      setJwt:(jwt_token)=>set({jwt_token:jwt_token}),
      setUserPhoneNumber:(phno)=>set({phone_number:phno}),
      clearuserId:()=>
        set({tempuserId:null}),
      clearUserJwt:()=> set({jwt_token:null}),
      clearUserPhoneNumber:()=>set({phone_number:null}),
      setUser:(User:user)=>set({user:User}),
      clearUser:()=>set({user:null})
    }),
    {
      name: "User_Data_store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default UserDataStorage