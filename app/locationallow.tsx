import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function LocationPermission() {
  const onAllow = () => {
    console.log("Allow location");
  };

  const onManual = () => {
    console.log("Enter pickup manually");
  };

  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("@/assets/images/Vector.png")}
          // 🔁 replace later with your own image
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      {/* Content */}
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
        <TouchableOpacity style={styles.primaryButton} onPress={onAllow}>
          <Text style={styles.primaryText}>Allow Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onManual}>
          <Text style={styles.secondaryText}>Enter pickup manually</Text>
        </TouchableOpacity>
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

  imageWrapper: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "90%",
    height: "90%",
  },

  content: {
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },

  buttonWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 30,
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

  secondaryText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },
});
