import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import axios from "axios";
import { encode } from "base-64";
import { COLOURS } from "../constants/Theme";
import OTP from "./OTP";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState("");
  const [signUpNumber,setSignUpNumber] = useState('')
  // console.log(signUpNumber,phoneNumber)

  const getUserData = async () => {
    const res = await AsyncStorage.getItem("user-data");
    const data = JSON.parse(res);
    setSignUpNumber(`+91${data.number}`)
    // console.log(res)
  };
  useEffect(() => {
    getUserData();
  }, [signUpNumber]);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a valid or registered phone number.");
      return;
    }
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      setData(otp);

      const accountSid = "AC94273c473bb9659e81543e4e54ea3f22";
      const authToken = "688ef6a87de50f5695164259e68ca88a";
      const twilioPhoneNumber = "+17622494652";
      const message = `Your OTP for login is: ${otp}.`;

      const authHeader = `Basic ${encode(`${accountSid}:${authToken}`)}`;
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        `To=${encodeURIComponent(phoneNumber)}&From=${encodeURIComponent(
          twilioPhoneNumber
        )}&Body=${encodeURIComponent(message)}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 201) {
        setFlag(true);
      } else {
        Alert.alert("Error", "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: COLOURS.white,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>
      {flag ? <OTP data={data} navigation={navigation} /> : null}
      <Image
        source={require("../../assets/icon.png")}
        style={{
          width: "45%",
          height: "45%",
          resizeMode: "contain",
        }}
      />
      <TextInputMask
        style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}
        type={"custom"}
        options={{
          mask: "+999999999999",
        }}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
        }}
        onPress={handleSendOTP}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Send OTP</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
      <View style={{ flexDirection: "row", margin: 40, gap: 10 }}>
          <Text>Don't have any account?</Text>
          <Text
            style={{ color: COLOURS.blue, textDecorationLine: "underline" }}
          >
            Sign up
          </Text>
      </View>
        </TouchableOpacity>
    </View>
  );
};

export default Login;
