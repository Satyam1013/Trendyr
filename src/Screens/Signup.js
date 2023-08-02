import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { COLOURS } from "../constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState('');
  const [numError, setNumError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);

  // console.warn(typeof number);
  const handleSignup = async () => {
    const payload = {
      username,
      email,
      password,
      number,
    };
    if (
      username.length < 1 ||
      username == "" ||
      email.length < 1 ||
      email == "" ||
      number == 0 ||
      number.toString().length !== 10 ||
      password.length < 1 ||
      password == ""
    ) {
      if (username.length < 3 || username == "") {
        setUserError(true);
      } else setUserError(false);
      if (email.length < 7 || email == "") {
        setEmailError(true);
      } else setEmailError(false);
      if (password.length < 8 || password == "") {
        setPassError(true);
      } else setPassError(false);
      if (number.toString().length !== 10) {
        setNumError(true);
     await AsyncStorage.setItem("user-data", number);
      } else {
        setNumError(false);
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Image
        source={require("../../assets/icon.png")}
        style={{
          width: "45%",
          height: "45%",
          resizeMode: "contain",
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      {userError ? (
        <Text style={{ color: COLOURS.red }}>Invalid Username</Text>
      ) : (
        <Text></Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text style={{ color: COLOURS.red }}>Invalid Email</Text>
      ) : (
        <Text></Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {passError ? (
        <Text style={{ color: COLOURS.red }}>
          Password Length Must Be More Than 8
        </Text>
      ) : (
        <Text></Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Number"
        onChangeText={(text) => setNumber(+text)}
        value={number}
        secureTextEntry
        keyboardType="number-pad"
      />
      {numError ? (
        <Text style={{ color: COLOURS.red }}>Invalid Number</Text>
      ) : (
        <Text></Text>
      )}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <View style={{ flexDirection: "row", margin: 40, gap: 10 }}>
          <Text>Already have an account?</Text>
          <Text
            style={{ color: COLOURS.blue, textDecorationLine: "underline" }}
          >
            Login
          </Text>
      </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLOURS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: COLOURS.backgroundMedium,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  signupButtonText: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignupScreen;
