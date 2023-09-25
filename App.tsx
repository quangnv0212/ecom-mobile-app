import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { AppContext, AppProvider } from "./src/contexts/app.context";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import {
  CartScreen,
  CategoryScreen,
  EditProfileScreen,
  LoginScreen,
  ProductDetailScreen,
  SignUpScreen,
} from "./src/screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const { setProfile } = React.useContext(AppContext);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Bottom Navigation"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppProvider>
      </QueryClientProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
