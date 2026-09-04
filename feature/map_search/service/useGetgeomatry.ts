import { SearchApi } from "../api/search.api";
import { useState } from "react";
import TripDtaStorage from "@/feature/trip/store/TripGeomatryDistanceDurationStorage";
import { latlong } from "../types/latlong.types";
import { useRouter } from "expo-router";
type prop={
    data:latlong,
    sourceLocation:string,
    destLocation:string,
    onclose:()=>void
}
export function useGetgeometry(){
    const [loading, setloading] = useState<boolean>(false)
    const router = useRouter();
    const setTripdata = TripDtaStorage.getState().setTripData;
    async function getPolyDistDuration({data,sourceLocation,destLocation,onclose}:prop) {
        try {
            setloading(true)
            const response = await SearchApi.getPolygone(data);
            if(response.status===200){
                setTripdata(sourceLocation,destLocation, response.data?.routes[0]?.geometry, response.data.routes[0].distance, response.data.routes[0].duration)
                onclose();
                router.push("/tripbooking")
            }
        } catch (error:unknown) {
            console.log("Error during getting geomatry",error)
        }finally{
            setloading(false)
        }
    }
    return{
        loading,
        getPolyDistDuration
    }
}