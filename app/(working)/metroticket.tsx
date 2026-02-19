import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SockJs from "sockjs-client";
const metroticket = () => {
  const body = {
    riderId: 1234,
    driverId: 2245
  } 
  const url = "http://192.168.0.117:8088/trip"
  const stompClient = useRef<Client|null>(null)
  useEffect(() => {
      stompClient.current= new Client({
      webSocketFactory:()=>new SockJs(url),
      reconnectDelay: 4000,
      debug:(str)=>{console.log(str)},
      onConnect: () => {
        console.log("Connected ✅")
      },
      onDisconnect:()=>{
        console.log("Disconnected ✅")
      }
    })
    stompClient.current.activate()
  }, [])

  const opPresscllick=()=>{
    if(stompClient.current && stompClient.current.connected){
      stompClient.current.publish({
        destination:"/sawari/sendTrip",
        body:JSON.stringify(body)
      })
      console.log("Message Sent 🚀");
    }else{
      console.log("Not connected yet ❌");
    }
  }
  return (
    <SafeAreaView>
      <View>
        <Text>hii</Text>
        <TouchableOpacity onPress={()=>opPresscllick()}>
          <Text>click me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default metroticket
