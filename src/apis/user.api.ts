import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";
import { SuccessResponse } from "../types/utils.type";
import { User } from "../types/user.type";

const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(token!),
    };
  };
  export type BodyUpdateProfile={
      name?: string
      date_of_birth?: string // ISO 8610
      avatar?: string
      address?: string
      phone?: string
    
  }
  
  export const getProfile = async () => {
    const headers = await getHeaders();
    return http.get<SuccessResponse<User>>("me", { headers });
  }
  export const updateProfile = async (
    body: BodyUpdateProfile
  ) => {
    const headers = await getHeaders();
    return http.put<SuccessResponse<User>>("user", body, { headers });
  }
