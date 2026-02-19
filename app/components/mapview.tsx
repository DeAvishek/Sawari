import { decode } from "@googlemaps/polyline-codec"
import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
const Mapview = () => {
    const encodePolyline = "uilyHdrVIV}@lCWn@ILA@CFBBFF`AfBz@~AB@B@B@DB?D@F?J@L?LAH?DAFEHuAzBA@CDFH?@h@lA@B@BVl@BHDJLZ?@l@lBn@jBBHDH?@Th@@BNXTZTRJFDBBF@FH?FAF?bAEh@CF?FAB?BADABD@BB@B?FA?H@HDJLf@x@tCBFHXP?F?H@\\?B@N?b@AZ?FAVEPCJEp@]XU@AZa@JSP_@DK@EBEDIBGDELIJCFAFA@ARANCTCN?REH?HAN?D?JAPAn@KPEJCFAFAVCHBF@RPFDJJHJ??BWFWHk@HY@EF]V_CNoAUKEEIEID_@v@OXKPEGGK[i@A?CEG?AAMQEK?G?C?E@GFM`@aAl@sAt@}ADIBGD?GKgAgBEGOU?@CDEHMVa@x@" 
    const polyLineCorords = decode(encodePolyline,5).map(([lat,long])=>({
        latitude:lat,
        longitude:long
    }))
    // const { latitude, longitude } = LocationDataStore()
    return (
        <MapView
            onPress={(e) => console.log(e.nativeEvent.coordinate)}
            style={StyleSheet.absoluteFill}
            initialRegion={{
                latitude: polyLineCorords[0].latitude,
                longitude: polyLineCorords[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {/* we can rander a list of markers */}
            <Marker
                coordinate={{ latitude: polyLineCorords[0].latitude, longitude: polyLineCorords[0].longitude }}
                title='Pick up'
            />
            <Marker
               coordinate={{latitude:polyLineCorords[polyLineCorords.length-1].latitude,longitude:polyLineCorords[polyLineCorords.length-1].longitude}}
               title="Drop"
            />
            <Polyline
                coordinates={polyLineCorords}
                strokeColor='#65937d'
                strokeWidth={5}
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000',
                ]}
            />
        </MapView>
    )
}

export default Mapview