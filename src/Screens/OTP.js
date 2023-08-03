import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { COLOURS } from "../constants/Theme";

const OTP = ({ data, navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [otp, setOtp] = useState("");
  // console.log(otp, data)

  const handleOptIn = () => {
    
    if (otp == data) {
      setModalVisible(false);
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Wrong OTP");
      // setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}
             
              placeholder="Enter OTP"
              value={otp}
              onChangeText={(text) => setOtp(text)}
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.optInButton]}
              onPress={handleOptIn}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  optInButton: {
    backgroundColor: COLOURS.green,
  },
  optOutButton: {
    backgroundColor: COLOURS.red,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default OTP;
