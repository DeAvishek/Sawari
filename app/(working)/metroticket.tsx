
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Websocket from "../service/Websocket";
const metroticket = () => {
  const [message, setmessage] = useState<{
    riderId: number | null;
    driverId: number | null;
  }>({
    riderId: null,
    driverId: null
  })
  const body = {
    riderId: 6888,
    driverId: 490
  }
  useEffect(() => {
    Websocket.connect()
    Websocket.subscribe("/topic/tripStatus",(msg)=>{
      const parsed = JSON.parse(msg.body)
      setmessage(parsed)
    })
  }, [])

  const opPresscllick = () => {
    Websocket.publish("/sawari/sendTrip", body)

  }
  return (
    <SafeAreaView>
      <View>
        <Text>hii</Text>
        <TouchableOpacity onPress={() => opPresscllick()}>
          <Text>click me</Text>
        </TouchableOpacity>
        <Text>{message.riderId} , {message.driverId}</Text>
      </View>
    </SafeAreaView>
  )
}
export default metroticket
