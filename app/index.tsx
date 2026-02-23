import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as Notification from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginFormData, LoginSchema } from "./schema/Loginschema";
import UserDataStorage from "./store/UserStorage";
Notification.setNotificationHandler({
  handleNotification:async()=>({
    shouldPlaySound:true,
    shouldSetBadge:true,
    shouldShowBanner:true,
    shouldShowList:true
  })
})
export default function Index() {
  const url = "http://192.168.0.117:8088/Rider/create_user"
  const router = useRouter();
  const setUserIdinStore = UserDataStorage(state=>state.setTempUserId);
  const { handleSubmit, control, formState: {errors}, } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: "",
      phoneNumber: "",
    }
  })
  useEffect(()=>{
    const notificationPermission=async()=>{
      const {granted} = await Notification.requestPermissionsAsync()
      if(!granted){
        window.alert("Notification is not granted")
      }
    }
    notificationPermission()
  })
  const onPressOnNext = async(data: LoginFormData) => {
    try{
      const response = await axios.post(url,data)
      if(response.status===200 || response.status===201){
        await Notification.scheduleNotificationAsync({
          content:{
            title:"Welcome to sawari",
            body:`Welcome user ${response.data.userName}`
          },
          trigger:null
        })
        console.log(response.data)  //todo to remove
        setUserIdinStore(response.data?.id||"") //set in store
        router.push("/verification");
      }     
    }catch(error:any){
      if(error.response){
        await Notification.scheduleNotificationAsync({
          content:{
            title:"Somthing went wrong",
            body:`${error.response.data}`
          },
          trigger:null
        })
      }
    }
    
  };


  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImagediv}>
        <Image
          style={styles.topimage}
          resizeMode="cover"
          source={require("@/assets/images/Vector.png")}
        />
      </View>

      {/* Login Card */}
      <View style={styles.LoginParent}>
        <View style={styles.LoginChild}>

          {/* ===== INPUT SECTION ===== */}
          <View style={styles.inputSection}>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Name?</Text>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      style={styles.Textinput}
                      placeholder="Enter your name"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                    />
                  </>
                )}
              />
              {errors.userName && <Text style={{color:'balck'}}>{errors.userName.message}</Text>}

            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Number?</Text>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.Textinput}
                    keyboardType="phone-pad"
                    placeholder="Enter your number"
                    placeholderTextColor="#999"
                    maxLength={10}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.phoneNumber && <Text style={{color:"black"}}>{errors.phoneNumber.message}</Text>}
            </View>
          </View>

          {/* ===== BUTTON SECTION ===== */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onPressOnNext)}>
              <Text style={styles.buttonText}>N e x t</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>L o g i n OR S i g n u p</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
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
});
