import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import {useAudioPlayer} from "expo-audio"

const Haha = () => {
    const player = useAudioPlayer(
        require("@/assets/audio/dog.mpeg")
    )
    useEffect(()=>{
        player.play();
    },[])
    return (
        <LinearGradient colors={["#16ecbd", "#16ecbd", "transparent"]} style={{ flex: 1 }}>
            <View>
                <Image
                    style={style.dogStyle}
                    source={require("@/assets/images/dog.jpg")}
                    contentFit='contain'
                />
                <Text style={{ color: '#000000', fontSize: 35}}>Opps!We are working on it...</Text>
            </View>
        </LinearGradient>

    )
}
const style = StyleSheet.create({
    dogStyle: {
        height: '80%',
        width: '100%',
    }
})
export default Haha