import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SIZES } from "../constants/sizes";
import { COLORS } from "../constants/color";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { purchasesStatus } from "../constants/purchases";
import { getPurchases } from "../apis/purchase.api";
import { AppContext } from "../contexts/app.context";

export default function Header() {
  const navigation = useNavigation();
  const { isAuthenticated } = useContext(AppContext);
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated,
  });
  const total = purchasesInCartData?.data.data.length;
  return (
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        <Ionicons name="location-outline" size={24} />
        <Text style={styles.location}>Ha Noi</Text>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>{total} </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Fontisto name="shopping-bag" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    // fontFamily: "Poppins-Bold",
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    // fontFamily: "Poppins-Semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    // fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
