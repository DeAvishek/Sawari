import { LinearGradient } from 'expo-linear-gradient';
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LocationDataStore from './store/LocationStorage';
export default function LocationPermission() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const set_Location_Coords= LocationDataStore((state)=>state.setLocationData);
  const AllowLocationPermission = async () => {
    try {
      console.log("button pressed")
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      set_Location_Coords(location.coords.latitude,location.coords.longitude)
      router.push('/home')
    } catch (error) {
      console.warn(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topImagediv}>
        <Image
          style={styles.topimage}
          resizeMode="cover"
          source={require("@/assets/images/location.png")} />
      </View>
      {/* Content */}
      <View style={styles.main}>
        <LinearGradient
          colors={['#16ecbd', 'transparent']}
          style={styles.gradientView}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Location permission not enabled
          </Text>
          <Text style={styles.subtitle}>
            Sharing location permission helps us improve your ride booking and
            pickup experience
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.primaryButton} onPress={AllowLocationPermission}>
            <Text style={styles.primaryText}>A l l o w  P e r m i s s i o n</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/home")}>
            <Text style={styles.secondaryText}>E n t e r  p i c k u p  m a n u a l l y</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const MINT = "#0F766E";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    zIndex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 22,
  },

  buttonWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    zIndex: 1,
  },

  primaryButton: {
    backgroundColor: MINT,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: "#E5E7EB",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    zIndex: 0,
  },
  secondaryText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },
  topImagediv: {
    height: 300,
    width: '100%',
  },

  topimage: {
    width: '100%',
    height: '100%',
  },
});
