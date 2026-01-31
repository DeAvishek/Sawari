import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
const autobooking = () => {
  return (
    <LinearGradient colors={["#16ecbd", "transparent"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <Text>Auto Booking</Text>
            </SafeAreaView>
    </LinearGradient>
  )
}

export default autobooking