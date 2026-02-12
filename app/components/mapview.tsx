import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import LocationDataStore from '../store/LocationStorage'

const Mapview = () => {
    const {latitude,longitude} = LocationDataStore()
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
            
        </MapView>
    )
}

export default Mapview