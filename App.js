import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import Cart from "./src/Screens/MyCart";
import ProductInfo from "./src/Screens/ProductInfo";
import SignupScreen from "./src/Screens/Signup";
import CheckoutScreen from "./src/Screens/Checkout";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyCart" component={Cart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
