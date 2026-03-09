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
  const [sourceLongandLat, setsourceLongandLat] = useState({
    longitude:"",
    latitude:"",
  })
  const [destLongandLat, setdestLongandLat] = useState({
    longitude:"",
    latitude:"",
  })
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
      console.log("called suggestion") //todo to remove
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
      console.log("called suggestion") //todo to remove
      const response = await axios.get(`${URL}/get/autocomplete/${query}`)
      if (response.status === 200) {
        setsuggestionForDest(response.data)
      }
    } catch (error: any) {
      console.log("hii", error)
    }
  }
  //after closing the modal
  const AfterClosingModal = ()=>{
    setsourceLocation("");
    setdestLocation("");
    setsuggestionForSource([]);
    setsuggestionForDest([]);
    onClose();
  }
  const onPressOnSourceSuggestion=({display_name,lat,lon,place_id}:suggestionProp)=>{
    setsourceLocation(display_name);
    setsourceLongandLat({longitude:lon,latitude:lat})
    console.log(place_id)
    console.log(sourceLongandLat)
  }
  const onPressOndestSuggestion=({display_name,lat,lon,place_id}:suggestionProp)=>{
    setdestLocation(display_name);
    setdestLongandLat({longitude:lon,latitude:lat})
    console.log(place_id)
    console.log(sourceLongandLat)
  }
  const onPressOnBookRide=async()=>{
    //sent data to backend the source and destination(lat,long)
    try {
      const body = {
        "sourceLongitude":sourceLongandLat.longitude,
        "sourceLatitude":sourceLongandLat.latitude,
        "destinationLongitude":destLongandLat.longitude,
        "destinationLatitude":destLongandLat.latitude
      }
      const response = await axios.post(`${URL}/get/src_dest/direction`,body)
      if(response.status===200){
        console.log(response.data)
      }
    } catch (error:any) {
      console.log(error.response.data)
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Choose Location</Text>
            <Pressable onPress={AfterClosingModal} style={{backgroundColor:'black',borderRadius:10,height:30,width:30}}>
              <Ionicons name="close-sharp" size={30} color="#d97777" />
            </Pressable>
          </View>
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
            <Pressable key={idx} style={styles.suggestionItem} onPress={()=>onPressOnSourceSuggestion(item)} >
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
            <Pressable key={idx} style={styles.suggestionItem} onPress={() => onPressOndestSuggestion(item)}>
              <Ionicons name="location" size={20} />
              <Text>{item.display_name}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.BookRideButton} onPress={onPressOnBookRide}>
            <Text style={styles.closeText}>Book Ride</Text>
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

  BookRideButton: {
    marginTop: 15,
    backgroundColor: "#0F766E",
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