import { create } from "zustand"
type tripData={
    source:string|null,
    destination:string|null,
    geometry:string|null,
    distance:number|null
    duration:number|null
}

type Actions={
    setTripData:(source:string|null,destination:string|null,geometry:string|null,distance:number|null,duration:number|null)=>void
    clearTrip: () => void
}

const TripDtaStorage = create<tripData & Actions>()(
    (set)=>({
        source:null,
        destination:null,
        geometry:null,
        distance:null,
        duration:null,
        
        setTripData:(source,destination,geometry,distance,duration)=>set({
                                                                          source:source,
                                                                          destination:destination,
                                                                          geometry:geometry,
                                                                          distance:distance,
                                                                          duration:duration}),
        clearTrip:()=>set({source:null,destination:null,geometry:null,distance:null,duration:null})
    })
)
export default TripDtaStorage
