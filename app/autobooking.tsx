import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const autobooking = () => {
  const [message, setmessage] = useState<{
      riderId: number | null;
      driverId: number | null;
    }>({
      riderId: null,
      driverId: null
    })
  return (
    <LinearGradient colors={["#16ecbd", "transparent"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <Text>{message.riderId},{message.driverId}</Text>
            </SafeAreaView>
    </LinearGradient>
  )
}

export default autobooking