import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import SignupForm from '../components/forms/SignupForm'
import { useSignup } from '../service/useSignup'
const SignupScreen = () => {
    const {loading} = useSignup()
    return (
        <View style={styles.container}>
            <View style={styles.topImagediv}>
                <Image
                    style={styles.topimage}
                    resizeMode="stretch"
                    source={require("@/assets/images/Vector.png")}
                />
            </View>
            <View style={styles.LoginParent}>
                <SignupForm loading={loading}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    topImagediv: {
        height: 250,
        width: '100%',
    },

    topimage: {
        width: '100%',
        height: '100%',
    },
    LoginParent: {
        position: 'absolute',
        top: 240,
        left: 0,
        right: 0,
        backgroundColor: '#ececec',
        borderRadius: 20,
        padding: 20,
        height: 760,
    },
})
export default SignupScreen