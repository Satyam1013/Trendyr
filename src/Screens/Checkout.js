import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { COLOURS } from "../constants/Theme";

const Checkout = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");

  const { confirmPayment } = useConfirmPayment();

  const handleCardPayment = async () => {
    try {
      const { paymentMethod } = await confirmPayment({
        type: "Card",
        card: {
          number: cardNumber,
          expMonth: parseInt(expiryMonth),
          expYear: parseInt(expiryYear),
          cvc,
        },
      });

      console.log("Card Payment Successful!", paymentMethod);
    } catch (error) {
      console.error("Card Payment Error:", error);
    }
  };
  const handleCheckout = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }
    ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);

    navigation.navigate("Home");
  };

  const handleUpiPayment = () => {
    setSelectedPaymentOption("upi");
  };

  const handleBankAccountPayment = () => {
    setSelectedPaymentOption("bankAccount");
  };

  const handleCashOnDeliveryPayment = () => {
    setSelectedPaymentOption("cashOnDelivery");
  };

  const renderPaymentFields = () => {
    if (selectedPaymentOption === "upi") {
      return (
        <View>
          <Text style={styles.label}>UPI ID</Text>
          <TextInput style={styles.input} placeholder="Enter UPI ID" />
        </View>
      );
    } else if (selectedPaymentOption === "bankAccount") {
      return (
        <View>
          <Text style={styles.label}>Account No.</Text>
          <TextInput style={styles.input} placeholder="Enter Account No." />
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CVV"
            // Add appropriate state and onChange handlers for CVV
          />
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            // Add appropriate state and onChange handlers for Expiry Date
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.cardField}
        onCardChange={(cardDetails) => {
          setCardNumber(cardDetails.number);
          setExpiryMonth(cardDetails.expMonth);
          setExpiryYear(cardDetails.expYear);
          setCvc(cardDetails.cvc);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleCardPayment}>
        <Text style={styles.buttonText}>Pay with Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpiPayment}>
        <Text style={styles.buttonText}>Pay with UPI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleBankAccountPayment}
      >
        <Text style={styles.buttonText}>Enter Bank Account No.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCashOnDeliveryPayment}
      >
        <Text style={styles.buttonText}>Cash on Delivery</Text>
      </TouchableOpacity>

      {renderPaymentFields()}
      <TouchableOpacity
        onPress={handleCheckout}
        style={{ backgroundColor: COLOURS.green, padding: 20, margin: 50 }}
      >
        <Text style={{ color: COLOURS.white }}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardField: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Checkout;
