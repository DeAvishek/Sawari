import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
type Props = {
  modalVisible: boolean;
  onClose: () => void;
};
type suggestionProp = {
  display_name: string,
  lat: string,
  lon: string,
  place_id: string
}
const Sourcedest = ({ modalVisible, onClose }: Props) => {
  const URL = process.env.EXPO_PUBLIC_BACKEND_URL
  const [sourceLocation, setsourceLocation] = useState<string | null>("")
  const [destLocation, setdestLocation] = useState<string | null>("")
  const [suggestionForSource, setsuggestionForSource] = useState<suggestionProp[]>([])
  const [suggestionForDest, setsuggestionForDest] = useState<suggestionProp[]>([])
  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestion1(sourceLocation || "")
    }, 900);
    return () => clearTimeout(timer)
  }, [sourceLocation])

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestion2(destLocation || "")
    }, 900);
    return () => clearTimeout(timer)
  }, [destLocation])

  const getSuggestion1 = async (query: string) => {
    try {
      console.log("called suggestion")
      const response = await axios.get(`${URL}/get/autocomplete/${query}`)
      if (response.status === 200) {
        setsuggestionForSource(response.data)
      }
    } catch (error: any) {
      console.log("hii", error)
    }
  }
  const getSuggestion2 = async (query: string) => {
    try {
      console.log("called suggestion")
      const response = await axios.get(`${URL}/get/autocomplete/${query}`)
      if (response.status === 200) {
        setsuggestionForDest(response.data)
      }
    } catch (error: any) {
      console.log("hii", error)
    }
  }
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <Text style={styles.title}>Choose Location</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#555" />

            <TextInput
              placeholder="Enter Source"
              placeholderTextColor="#dcdcdc"
              style={styles.input}
              onChangeText={(text) => setsourceLocation(text)}
              value={sourceLocation || ""}
            />
          </View>
          <Ionicons name="arrow-down-sharp" />
          {suggestionForSource.map((item: suggestionProp, idx: number) => (
            <Pressable key={idx} style={styles.suggestionItem} onPress={() => setsourceLocation(item.display_name)} >
              <Ionicons name="location" size={20} />
              <Text>{item.display_name}</Text>
            </Pressable>
          ))}
          <View style={styles.inputContainer}>
            <Ionicons name="flag-outline" size={20} color="#555" />

            <TextInput
              placeholder="Enter Destination"
              placeholderTextColor="#dcdcdc"
              style={styles.input}
              onChangeText={(text) => setdestLocation(text)}
              value={destLocation || ""}
            />
          </View>

          {suggestionForDest.map((item: suggestionProp, idx: number) => (
            <Pressable key={idx} style={styles.suggestionItem} onPress={() => setdestLocation(item.display_name)}>
              <Ionicons name="location" size={20} />
              <Text>{item.display_name}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 10
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row"
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center"
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 8
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginLeft: 5
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    alignItems: "center"
  },

  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  }

});

export default Sourcedest;