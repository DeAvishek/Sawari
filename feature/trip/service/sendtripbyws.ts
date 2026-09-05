import Websocket from "@/app/utils/Websocket"
type tripDatawithuser={
    source:string|null,
    destination:string|null,
    geometry:string|null,
    distance:number|null,
    duration:number|null,
    riderId:any
    longitude:number|null,
    latitude:number|null
}
const sendTrip=({source,destination,geometry,distance,duration,riderId,longitude,latitude}:tripDatawithuser)=>{
    const data={
        source:source,
        destination:destination,
        geometry:geometry,
        distance:distance,
        duration:duration,
        riderId:riderId,
        longitude:longitude,
        latitude:latitude
    }
    Websocket.publish("/sawari/sendTrip",data)
}
export default sendTrip