import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useVerify } from '../../service/useVerify';
type props = {
    loading: boolean,
    timerLoading:boolean,
    timer:number
    CELL_COUNT: number,
}
const VerifyForm = ({ loading,timerLoading,timer,CELL_COUNT }: props) => {
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const { verify } = useVerify();
    const onPressOnNext = () => {
        const data = {
            otp: value
        }
        console.log(data) //todo to remove
        verify(data);
    }
    return (
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
                {timerLoading ?
                    (
                        <TouchableOpacity style={style.resendButtonStyle}>
                            <Text style={style.buttonText}>Resend in <Text style={{ color: 'red' }}>{timer}</Text></Text>
                        </TouchableOpacity>
                    ) :
                    (<TouchableOpacity style={style.resendButtonStyle} onPress={() => router.push('/home')}>
                        <Text style={style.buttonText}>Resend Otp</Text>
                    </TouchableOpacity>
                    )}
            </View>
            <TouchableOpacity style={style.button} onPress={onPressOnNext}>
                <Text style={style.buttonText}>{loading ? "Loading..." : "N e x t"}</Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    gradientView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 500,
        zIndex: 0,
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

export default VerifyForm