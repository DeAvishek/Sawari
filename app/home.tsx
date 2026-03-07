import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sourcedest from "./modal/sourcedest";
import UserDataStorage from "./store/UserStorage";
export default function Home() {
    //populate jwt from store
    const { jwt_token } = UserDataStorage();
    const [modalVisisble, setmodalVisisble] = React.useState<boolean>(false)
    const router = useRouter();
    const onmodelClose = () => {
        setmodalVisisble(false)
    }
    return (
        <LinearGradient colors={["#16ecbd", "transparent"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Top Section */}
                    <View style={styles.topView}>
                        <Ionicons name="reorder-three" size={50} />
                        <Pressable
                            style={styles.searchBox}
                            onPress={() => setmodalVisisble(true)}>
                            <Ionicons name="search" size={28} />
                            <Text style={{ marginLeft: 10,fontWeight:'bold'}}>Where are you going?</Text>
                        </Pressable>
                    </View>

                    {/* Middle placeholder */}
                    <View style={styles.middleView}>
                        <Text>Recent trip detials</Text>
                    </View>

                    {/* Explore Section */}
                    <View style={styles.middleView2}>
                        <Text style={styles.textStyle}>Explore</Text>

                        <View style={styles.middleview2_1}>
                            <Pressable style={styles.smallViewOfVie}>
                                <Image
                                    style={styles.veichelimage}
                                    source={require("@/assets/images/scooty.png")}
                                />
                                <Text>Scooter</Text>
                            </Pressable>
                            <Pressable style={styles.smallViewOfVie}>
                                <Image
                                    style={styles.veichelimage}
                                    source={require("@/assets/images/bike.png")}
                                />
                                <Text>Bike</Text>
                            </Pressable>

                            <Pressable style={styles.smallViewOfVie}>
                                <Image
                                    style={styles.veichelimage}
                                    source={require("@/assets/images/taxi.png")}
                                />
                                <Text>Taxi</Text>
                            </Pressable>

                            <Pressable style={styles.smallViewOfVie} onPress={() => router.push("/(working)/metroticket")}>
                                <Image
                                    style={styles.veichelimage}
                                    source={require("@/assets/images/metro.png")}
                                />
                                <Text>Metro</Text>
                            </Pressable>
                        </View>

                        {/* Hurry Card */}
                        <View style={styles.middleview2_2}>
                            <View style={{ flex: 1, gap: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                    IN HURRY?
                                </Text>
                                <Text>An auto will arrive in 10 minutes</Text>

                                <Link href="/autobooking">
                                    <Text style={{ fontWeight: "bold" }}>Book Now</Text>
                                </Link>
                            </View>
                            <Image
                                style={styles.autoImage}
                                source={require("@/assets/images/auto.jpg")}
                            />
                        </View>

                        <View style={styles.middleview2_3}>
                            <Image
                                style={{ height: 200, width: '100%' }}
                                source={require("@/assets/images/homepageBanner.png")}
                                resizeMode="cover"
                            />
                        </View>
                        <Sourcedest modalVisible={modalVisisble} onClose={onmodelClose} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 20,
    },
    topView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        flex: 1,
        height:45
    },
    Textinput: {
        height: 45,
        flex: 1,
        paddingHorizontal: 10,
    },
    middleView: {
        backgroundColor: "#e9eae8",
        height: 300,
        borderColor: 'black',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
    },
    middleView2: {
        gap: 10,
    },
    middleview2_1: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    middleview2_2: {
        backgroundColor: "#bfbfbf",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    middleview2_3: {
        height: 200,
        backgroundColor: "#aea0a0",
        borderRadius: 10,
    },
    smallViewOfVie: {
        backgroundColor: "#fff",
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    veichelimage: {
        width: "80%",
        height: "80%",
    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    autoImage: {
        height: 150,
        width: 160,
        borderRadius: 10,
    },
});
