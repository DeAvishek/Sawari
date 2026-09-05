import { decode } from "@googlemaps/polyline-codec"
import React, { useRef, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import TripDtaStorage from "@/feature/trip/store/TripGeomatryDistanceDurationStorage"
import { AuthStore } from "@/feature/auth/store/authstore"
import sendTrip from "@/feature/trip/service/sendtripbyws"
import { router } from "expo-router"
const Tripbooking = () => {
    const { source,destination,geometry, distance, duration } = TripDtaStorage()
    const rideId = AuthStore.getState().user?.userID
    const [sawari,setsawari] = useState<string>("")
    const [Activeitem, setActiveitem] = useState<number|null>(null)
    const polylineCoordinates = decode(geometry || "", 5).map(([lat, long]) => ({
        latitude: lat,
        longitude: long
    }))
    const searchingDrivers=()=>{
        console.log("trip send through websocket")
        sendTrip(
            {
                source:source||"",
                destination:destination||"",
                geometry:geometry||"",
                distance:distance,
                duration:duration,
                riderId:rideId,
                longitude:polylineCoordinates[0].longitude,
                latitude:polylineCoordinates[0].latitude

            }
        )
        router.push('/trippage')
    }
    const vehicleAvailable = [
        {
            "img_src": require("@/assets/images/cab.png"),
            "name": "Cab Non AC",
            "price":Math.ceil((distance||1)/1000)*20,
            "duration": ((duration||1)*2),
            "distance": distance,
            "person": 4
        },
        {
            "img_src": require("@/assets/images/cabac.png"),
            "name": "Cab AC",
            "price":Math.ceil((distance||1)/1000)*25,
            "duration": ((duration||1)*1.7),
            "distance": distance,
            "person": 4
        },
        {
            "img_src": require("@/assets/images/autorik.png"),
            "name": "Personal Auto Rikshaw",
            "price": Math.ceil((distance||1)/1000)*15,
            "duration": ((duration||1)*1.9),
            "distance": distance,
            "person": 2

        },
        {
            "img_src": require("@/assets/images/bikevei.png"),
            "name": "Bike",
            "price": Math.ceil((distance||1)/1000)*10,
            "duration": ((duration||1)*1.2),
            "distance": distance,
            "person": 1

        }
    ]
    const mapRef = useRef(null)
    return (
        // <SafeAreaView>
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
                            coordinate={{ latitude: polylineCoordinates[polylineCoordinates.length-1].latitude, longitude: polylineCoordinates[polylineCoordinates.length-1].longitude }}
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
                <View style={styles.middleview}>
                    {vehicleAvailable.map((item, idx) => (
                        <Pressable key={idx} onPress={()=>{setActiveitem(idx),setsawari(item.name)}}
                        style={[styles.pressable,Activeitem===idx && styles.activeCard]}
                        >
                            <View style={{flexDirection:"row"}}>
                                <Image source={item.img_src} style={{ height: 50, width: 60 }} />
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text style={{ color: '#777777', fontWeight: 'bold', fontSize: 12 }}>{Math.ceil((item.distance||0)/1000)}km  {Math.ceil((item.duration||0)/60)}min</Text>
                                </View>
                            </View>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>$ {item.price}</Text>
                        </Pressable>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={()=>searchingDrivers()}>
                        <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>Book Your {sawari||"Sawari"}</Text>
                     </TouchableOpacity>
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
        padding:10,
        gap:20
    },
    pressable: {
        flexDirection: "row",
        justifyContent:'space-between'
    },
    button: {
    // width: '100%',
    height: 50,
    backgroundColor: '#10a094',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:370,
    left:20,
    right:20
  },
  activeCard: {
    borderColor: "#0F766E",
    borderWidth: 2,
    backgroundColor: "#ffffff",
    borderRadius:10,
    paddingRight:2,
    paddingLeft:2,
    height:80,
    alignItems:'center'
  }
})

export default Tripbooking