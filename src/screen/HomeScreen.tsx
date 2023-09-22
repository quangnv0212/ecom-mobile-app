import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import categoryApi from "../apis/categories.api";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { ProductRow } from "../components/product";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";

const HomeScreen = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoryApi.getCategories();
    },
  });
  return (
    <SafeAreaView>
      <Header />
      <ScrollView style={{ marginBottom: 110 }}>
        {categoriesData &&
          categoriesData.data.data.map((x) => (
            <View key={x._id}>
              <Heading cate={x} />
              <ProductRow category={x._id} />
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
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
