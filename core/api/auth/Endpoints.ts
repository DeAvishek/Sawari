export const ENDPOINTS = {
    Auth:{
        "login":"/Rider/login",
        "verification":(phoneNumber:string)=>`/Rider/verify/${phoneNumber}`,
        "signup":"/Rider/signup",
        "refreshToken":(refreshToken:String)=>`/Rider/refreshToken/${refreshToken}`
    }
}