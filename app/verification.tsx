import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import UserDataStorage from './store/UserStorage';
const verification = () => {
    const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
    const RESEND_TIME = 5 //need to set 30
    const [timer, setTimer] = useState(RESEND_TIME);
    const navigation = useNavigation()
    const CELL_COUNT = 6
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter()
    useEffect(() => {
        if (timer == 0) {
            setLoading(false)
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000 * 1)
        return () => clearInterval(interval)
    }, [timer])
    //populate item from userStore;
    const {phone_number,tempuserId} = UserDataStorage();
    const setUserJwt = UserDataStorage(state=>state.setJwt)
    //phnumber modify
    const onPressOnNext=async()=>{
        const body={
            otp:value
        }
        try{
            console.log(`${API_URL}/Rider/verify/${tempuserId}`) //need to remove
            const response = await axios.post(`${API_URL}/Rider/verify/${tempuserId}`,body)
            if(response.status===200){
                //step1:after success need to send some notification
                //step2:store the bearer in store for user
                
                console.log(response.data) //todo need to remove
                setUserJwt(response.data?.bearer)
                //step3:route to next page most likely home
                router.push("/home")
            }
        }
        catch(error:any){
            console.log(error.response.data)
        }
    }
    const onPressOnResendForOtp=()=>{
        //need to do
        router.push("/home")
        console.log("clicekd on onPressOnResendForOtp")
    }
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
                        <Text style={{ fontSize: 15 }}>Send to +91{phone_number}</Text>
                    </View>
                </View>
            </View>
            <View style={style.main}>
                <LinearGradient
                    colors={['#16ecbd', 'transparent']}
                    style={style.gradientView}
                />
                <View>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={style.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                onLayout={getCellOnLayoutHandler(index)}
                                key={index}
                                style={[style.cell, isFocused && style.focusCell]}>
                                <Text style={style.cellText}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    {loading ?
                        (
                            <TouchableOpacity style={style.resendButtonStyle}>
                            <Text style={style.buttonText}>Resend in <Text style={{color:'red'}}>{timer}</Text></Text>
                            </TouchableOpacity>
                        ) :
                        (<TouchableOpacity style={style.resendButtonStyle} onPress={onPressOnResendForOtp}>
                            <Text style={style.buttonText}>Resend Otp</Text>
                        </TouchableOpacity>
                        )}
                </View>
                <TouchableOpacity style={style.button} onPress={onPressOnNext}>
                    <Text style={style.buttonText}>N e x t</Text>
                </TouchableOpacity>
            </View>
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
export default verification