import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [name, setName] = useState("");

  const onPressOnNext = () => {
    setName("");
    console.log(name)
    router.push("/verification");

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
              <TextInput
                style={styles.Textinput}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Number?</Text>
              <TextInput
                style={styles.Textinput}
                keyboardType="phone-pad"
                placeholder="Enter your number"
                placeholderTextColor="#999"
                maxLength={10}
              />
            </View>
          </View>

          {/* ===== BUTTON SECTION ===== */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={onPressOnNext}>
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
    gap:150, // 🔥 KEY LINE
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
