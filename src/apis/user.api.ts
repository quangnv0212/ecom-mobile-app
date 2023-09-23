import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";

const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(token!),
    };
  };
  
  export const getProfile = async () => {
    const headers = await getHeaders();
    return http.get("me", { headers });
  }