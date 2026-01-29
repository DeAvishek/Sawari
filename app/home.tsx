import React from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Home() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#16ecbd', 'transparent']}
                style={styles.gradientView}
            />
            <SafeAreaView style={styles.main}>
                {/* this is fro top div with search bar and three dot */}
                <View style={styles.topView}>
                    <View>
                        <Ionicons name='reorder-three' size={50} />
                    </View>
                    <View style={{ flexDirection: "row", backgroundColor: '#ffffff', borderRadius: 20 }}>
                        <Ionicons
                            name='search'
                            size={38} />
                        <TextInput
                            style={styles.Textinput}
                            placeholder="W h e r e  a r e  y o u  g o i n g ?"
                            placeholderTextColor="black"
                        />
                    </View>
                </View>
                {/* this is middle div with recent visited two destination */}
                <View style={styles.middleView}>
                    <Text>//----TODO----//</Text>
                </View>
                <View style={styles.middleView2}>
                    <Text style={styles.textStyle}>E x p l o r e</Text>
                    <View style={styles.middleview2_1}>
                        <View style={styles.smallViewOfVie}>
                            <Image
                                style={styles.veichelimage}
                                source={require("@/assets/images/scooty.png")}
                            />
                            <Text>Scotter</Text>
                        </View>
                        <View style={styles.smallViewOfVie}>
                            <Image
                                style={styles.veichelimage}
                                source={require("@/assets/images/bike.png")}
                            />
                            <Text>Bike</Text>
                        </View>
                        <View style={styles.smallViewOfVie}>
                            <Image
                                style={styles.veichelimage}
                                source={require("@/assets/images/taxi.png")}
                            />
                            <Text>Taxi</Text>
                        </View>
                        <View style={styles.smallViewOfVie}>
                            <Image
                                style={styles.veichelimage}
                                source={require("@/assets/images/metro.png")}
                            />
                            <Text>Metro ticket</Text>
                        </View>
                    </View>
                    <View style={styles.middleview2_2}>

                    </View>
                    <View style={styles.middleview2_3}>

                    </View>
                </View>
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        gap: 20,
    },
    gradientView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 500,
        zIndex: 0,
    },
    topView: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    middleView: {
        backgroundColor: '#e9eae8',
        height: 190,
        width: 'auto',
        borderRadius: 8
    },
    middleView2: {
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'column',
        gap: 6

    },
    middleview2_1: {
        height: 170,
        width: 'auto',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    middleview2_2: {
        height: 170,
        width: 'auto',
        backgroundColor: '#bfbfbf',
        borderRadius: 10
    },
    middleview2_3: {
        height: 170,
        width: 'auto',
        backgroundColor: '#805d5d',
        borderRadius: 10
    },
    smallViewOfVie: {
        backgroundColor: '#ffff',
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    veichelimage: {
        width: '80%',
        height: '80%'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    Textinput: {
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: 300,
        paddingHorizontal: 15,
    },
})