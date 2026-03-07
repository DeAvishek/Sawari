import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  modalVisible: boolean;
  onClose: () => void;
};

const Sourcedest = ({ modalVisible, onClose }: Props) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <Text style={styles.title}>Choose Location</Text>

          <TextInput
            placeholder="Enter Source"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Destination"
            placeholderTextColor="#888"
            style={styles.input}
          />

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

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9"
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