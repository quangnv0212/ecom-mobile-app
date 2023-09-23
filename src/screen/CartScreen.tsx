import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { purchasesStatus } from "../constants/purchases";
import { AppContext } from "../contexts/app.context";
import { getPurchases } from "../apis/purchase.api";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/color";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { CardCartView } from "../components/product";
import { SIZES } from "../constants/sizes";

const CartScreen = () => {
  const { isAuthenticated, setExtendedPurchases, extendedPurchases } =
    useContext(AppContext);
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated,
  });
  useEffect(() => {
    setExtendedPurchases(
      purchasesInCartData?.data.data.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false,
      })) || []
    );
  }, [purchasesInCartData]);
  const navigation = useNavigation();
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked);
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({ ...purchase, checked: !isAllChecked }))
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Products</Text>
        </View>
        {extendedPurchases.length > 0 ? (
          <FlatList
            style={{
              marginVertical: 50,
              marginHorizontal: 22,
              marginBottom: 120,
            }}
            data={extendedPurchases}
            renderItem={(item: any) => (
              <CardCartView refetch={refetch} data={item} />
            )}
            contentContainerStyle={{ gap: 15, marginVertical: 20 }}
          />
        ) : (
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 100,
            }}
          >
            Empty Cart
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          padding: 15,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Checkbox
            onValueChange={handleCheckAll}
            value={isAllChecked}
            style={{ marginRight: 8 }}
            color={COLORS.primary}
          />
          <Text>Select All ({extendedPurchases.length} product) </Text>
          <Text style={{ position: "absolute", right: 0 }}>Delete</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>
            Total:{" "}
            {/* {total.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })} */}
          </Text>
        </View>
        <Button color={COLORS.primary} title="Buy now" />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  upperRow: {
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
    width: "90%",
  },
  heading: {
    // fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  container: {
    marginTop: 20,
    // marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: 12,
  },
  titletxt: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  favContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    shadowColor: COLORS.secondary,
  },
});
