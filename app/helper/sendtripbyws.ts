import Websocket from "./Websocket"

type tripDatawithuser={
    source:string|null,
    destination:string|null,
    geometry:string|null,
    distance:number|null,
    duration:number|null,
    riderId:any
}
const sendTrip=({source,destination,geometry,distance,duration,riderId}:tripDatawithuser)=>{
    const data={
        source:source,
        destination:destination,
        geometry:geometry,
        distance:distance,
        duration:duration,
        riderId:riderId
    }
    Websocket.publish("/sawari/sendTrip",data)
}
export default sendTrip