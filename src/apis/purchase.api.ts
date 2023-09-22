import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";
import { Purchase, PurchaseListStatus } from "../types/purchase.type";
import { SuccessResponse } from "../types/utils.type";
const URL = 'purchases'
// Helper function to get headers with authorization
const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": JSON.parse(token!),
  };
};

export const addToCart = async (body: {
  product_id: string;
  buy_count: number;
}) => {
  const headers = await getHeaders();
  return http.post("purchases/add-to-cart", body, { headers });
};

export const deletePurchase = async (body: {
  purchaseIds: string[];
}) => {
  const headers = await getHeaders();
  return http.delete("purchases", { data: body, headers });
};

export const getPurchases = async (params:{status:PurchaseListStatus}) => {
  const headers = await getHeaders();
  return http.get<SuccessResponse<Purchase[]>>(`${URL}`, { headers,params });
};

export const updatePurchase = async (body: {
  product_id: string;
  buy_count: number;
}) => {
  const headers = await getHeaders();
  return http.put("purchases/update-purchase", body, { headers });
};
