export const EndPoints={
    Map:{
        getSuggestion:(location:string)=>`/Rider/get/autocomplete/${location}`,
        getLocation:(location:string)=>`/Rider/get/location/${location}`,
        getDirection:'/Rider/get/src_dest/direction'
    }
}