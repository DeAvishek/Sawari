import { Server } from "@/core/Server"
import { EndPoints } from "@/core/api/bussiness/Endpoints"
import { latlong } from "../types/latlong.types";
import { AuthStore } from "@/feature/auth/store/authstore";
export class SearchApi{
    
    static getSuggestions(location:string){
        const jwt = AuthStore.getState().jwt;
        return Server.get(EndPoints.Map.getSuggestion(location),{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
    }
    static getLocations(location:string){
        const jwt = AuthStore.getState().jwt;
        return Server.get(EndPoints.Map.getLocation(location),{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
    }
    static getPolygone(data:latlong){
        const jwt = AuthStore.getState().jwt;
        return Server.post(EndPoints.Map.getDirection,data,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
    }

}