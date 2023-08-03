import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { COLOURS } from "../constants/Theme";
import { Items } from "../Components/db";
import Zocial from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProductCard from "./ProductCard";
import Logout from "./Logout";

const Home = ({ navigation }) => {
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  handleLogoutConfirmation = async () => {
    Alert.alert("Logout", "You have successfully logged out!");
    navigation.navigate("Login");
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }
  };

  const getDataFromDB = () => {
    let electronicsList = [];
    let fashionList = [];
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].category == "Electronics") {
        electronicsList.push(Items[i]);
      } else if (Items[i].category == "Fashion") {
        fashionList.push(Items[i]);
      }
    }
    setElectronics(electronicsList);
    setFashion(fashionList);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <View style={{ padding: 12, borderRadius: 10 }}>
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: "25%",
                height: "0%",
                padding: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              />
            </TouchableOpacity>
            <Logout
              visible={logoutModalVisible}
              onConfirm={() => {
                handleLogoutConfirmation();
                setLogoutModalVisible(false);
              }}
              onCancel={() => setLogoutModalVisible(false)}
            />
            <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
              <Zocial
                name="login"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.red,
              fontWeight: "600",
              letterSpacing: 10,
              marginBottom: 10,
            }}
          >
            TRENDYR
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Your Ultimate Fashion Destination
            {"\n"}This site offers both Electronics and Fashion Products
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Electronics
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {electronics.map((data) => {
              return (
                <ProductCard
                  data={data}
                  navigation={navigation}
                  key={data.id}
                />
              );
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Fashion
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                78
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {fashion.map((data) => {
              return (
                <ProductCard
                  data={data}
                  navigation={navigation}
                  key={data.id}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
