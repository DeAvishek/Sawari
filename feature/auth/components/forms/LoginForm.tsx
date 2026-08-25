import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { phoneNumberData, phoneNumberSchema } from '../../schema/phoneNumberSchema'
import { useLogin } from '../../service/useLogin'
type props={
  loading:boolean
}
const LoginForm = ({loading}:props) => {
    const {login} = useLogin();
    const { formState: { errors }, handleSubmit, control } = useForm<phoneNumberData>({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: {
            phoneNumber: ""
        }
    })
    //this should be in LoginScreen to more systematic and decoupled
    const onSubmit=(data:phoneNumberData)=>{
      const body = {
        phoneNumber:data.phoneNumber
      }
      login(body)

    }
    return (
        <View style={styles.LoginChild}>
            <View style={styles.inputSection}>
                <View style={styles.inputBlock}>
                    <Text style={styles.TextStyle}>What's Your Number?</Text>
                    <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="PhoneNumber"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                keyboardType="number-pad"
                                value={value}
                                style={styles.Textinput}
                            />
                        )}
                    />
                    {errors && <Text style={{ color: 'red' }}>{errors.phoneNumber?.message}</Text>}
                </View>
            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.button} disabled={loading} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>{loading?"Loading...":"L o g - i n"}</Text>
                </TouchableOpacity>
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

    LoginChild: {
        flex: 1,
        gap: 150, // 🔥 KEY LINE
    },

    /* INPUT SECTION */
    inputSection: {
        gap: 20,
    },

    inputBlock: {
        width: '100%',
    },

    TextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#010606',
    },

    Textinput: {
        height: 50,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#0F766E',
    },

    /* BUTTON SECTION */
    buttonSection: {
        alignItems: 'center',
        gap: 20,
    },

    orText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },

    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#0F766E',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default LoginForm