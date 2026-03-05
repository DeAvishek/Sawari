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
    setUserData:(jwt_token:string,user:user)=>void
    setUserPhoneNumber:(phno:string)=>void
    clearuserId:()=>void
    clearUserData:()=>void
}
const UserDataStorage = create<UserDataType & Actions>()(
  persist(
    (set) => ({
      tempuserId:null,
      jwt_token:null,
      user:null,
      phone_number:null,

      setTempUserId: (id)=>set({tempuserId:id}),
      setUserData: (jwt_token,user)=>set({jwt_token:jwt_token,user:user}),
      setUserPhoneNumber:(phno)=>set({phone_number:phno}),
      clearuserId:()=>
        set({tempuserId:null}),
      clearUserData:()=> set({jwt_token:null,user:null})
    }),
    {
      name: "User_Data_store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default UserDataStorage