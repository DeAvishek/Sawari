import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { Image } from 'expo-image'
import TripDtaStorage from "@/feature/trip/store/TripGeomatryDistanceDurationStorage"
import { decode } from '@googlemaps/polyline-codec'

const trippage = () => {
    const mapRef = useRef(null)
    const geometry = TripDtaStorage.getState().geometry;
    const polylineCoordinates = decode(geometry || "", 5).map(([lat, long]) => ({
        latitude: lat,
        longitude: long
    }))
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.mapView}>
                    <MapView
                        style={StyleSheet.absoluteFill}
                        ref={mapRef}
                        onMapReady={() => {
                            if (mapRef.current && polylineCoordinates?.length > 0) {
                                mapRef.current?.fitToCoordinates(polylineCoordinates, {
                                    edgePadding: {
                                        top: 100,
                                        right: 100,
                                        bottom: 100,
                                        left: 100,
                                    },
                                    animated: true,
                                });
                            }
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: polylineCoordinates[0].latitude, longitude: polylineCoordinates[0].longitude }}
                            title="pickup"
                        >
                            <Image source={require("@/assets/images/pickup.png")}
                                style={{ height: 25, width: 25 }}
                                resizeMode="contain"
                            />
                        </Marker>
                        <Marker
                            coordinate={{ latitude: polylineCoordinates[polylineCoordinates.length - 1].latitude, longitude: polylineCoordinates[polylineCoordinates.length - 1].longitude }}
                            title="drop"
                        >
                            <Image source={require("@/assets/images/drop.png")}
                                style={{ height: 25, width: 25 }}
                                resizeMode="contain"
                            />
                        </Marker>



                        <Polyline
                            coordinates={polylineCoordinates}
                            strokeColor="#131511" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#089b3b',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000',
                            ]}
                            strokeWidth={6}
                        />
                    </MapView>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    mapView: {
        height: 420,
    },
    middleview: {
        height: 500,
        position: "absolute",
        top: 410,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 10,
        gap: 20
    },
    pressable: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    button: {
        // width: '100%',
        height: 50,
        backgroundColor: '#10a094',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 370,
        left: 20,
        right: 20
    },
    activeCard: {
        borderColor: "#0F766E",
        borderWidth: 2,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingRight: 2,
        paddingLeft: 2,
        height: 80,
        alignItems: 'center'
    }
})
export default trippage