import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions"
import LocationDataStore from '../store/LocationStorage'
const Mapview = () => {
    const {latitude,longitude} = LocationDataStore()
    const source={"latitude": 22.724477932624513, "longitude": 88.38143806904554}
    const dest = {"latitude": 22.72390705649954, "longitude": 88.38676527142525}
    const GOOGE_MAP_API = "AIzaSyD0G73tyEqcjL5eAChEZor9gpqcL32_yIg"
    return (
        <MapView
            onPress={(e)=>console.log(e.nativeEvent.coordinate)}
            style={StyleSheet.absoluteFill}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {/* we can rander a list of markers */}
            <Marker
            coordinate={{latitude:latitude,longitude:longitude}}
            title='Your current Location'
            />
            <MapViewDirections
            origin={source}
            destination={dest}
            apikey={GOOGE_MAP_API}
            />
        </MapView>
    )
}

export default Mapview