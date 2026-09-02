import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VerifyForm from '../components/forms/VerifyForm';
import { CELL_COUNT } from '../helper/constants';
import { useVerify } from '../service/useVerify';
const VerificationScreen = () => {
    const [timer, setTimer] = useState<number>(10);
    const [timerLoading, settimerLoading] = useState<boolean>(true)
    const { loading, phoneNumber } = useVerify();
    const navigation = useNavigation();
    useEffect(() => {
        if (timer == 0) {
            settimerLoading(false)
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000 * 1)
        return () => clearInterval(interval)
    }, [timer])
    //--->end of effect
    return (
        <View style={style.container}>
            <View style={style.topMintDiv}>
                <View style={style.topMintChild}>
                    <TouchableOpacity
                        style={style.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={style.TextStyle}>Verify OTP</Text>
                    <View>
                        <Text style={style.TextStyle}>Enter Verification Code</Text>
                        <Text style={{ fontSize: 15 }}>Send to +91{phoneNumber?.slice(0, -6) + "******"}</Text>
                    </View>
                </View>
            </View>
            <VerifyForm loading={loading} timerLoading={timerLoading} timer={timer} CELL_COUNT={CELL_COUNT} />

        </View>
    )
}
const style = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    topMintDiv: {
        height: 250,
        width: '100%',
        backgroundColor: '#16ecbd',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    },
    gradientView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 500,
        zIndex: 0,
    },
    topMintChild: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 13,
        gap: 30
    },
    TextStyle: {
        color: '#010606', // Sawari primary color
        fontSize: 20,
        fontWeight: 'bold',

    },
    main: {
        position: 'absolute',
        backgroundColor: '#ececec',
        height: 760,
        top: 240,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
        flex: 1,
        gap: 350

    },
    codeFieldRoot: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    cell: {
        width: 45,
        height: 55,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#020f0d',
        textAlign: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    focusCell: {
        borderColor: '#178077',
    },
    cellText: { fontSize: 24, color: '#010a09', textAlign: 'center' },
    resendButtonStyle: {
        height: 40,
        width: 100,
        backgroundColor: '#0F766E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    backButton: {
        height: 40,
        width: 50,
        backgroundColor: '#ececec',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //        marginTop:20
    },

    button: {
        backgroundColor: '#0F766E',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default VerificationScreen