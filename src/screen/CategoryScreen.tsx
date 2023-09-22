import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";
import { Ionicons } from "@expo/vector-icons";
import { ProductListConfig } from "../types/product.type";
import productApi from "../apis/product.api";
import { useQuery } from "@tanstack/react-query";
import { ProductCardView } from "../components/product";

interface CategoryScreenProps {
  navigation: any;
  route?: any;
}

const CategoryScreen = ({ navigation, route }: CategoryScreenProps) => {
  const queryConfig = {
    page: 1,
    limit: 20,
    category: route.params._id,
  };
  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig);
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>{route.params.name}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: SIZES.xxLarge,
            paddingLeft: SIZES.small / 2,
          }}
        >
          <FlatList
            data={productsData?.data.data.products}
            numColumns={2}
            renderItem={(item) => <ProductCardView data={item.item} />}
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: SIZES.xxLarge,
              paddingLeft: SIZES.small / 2,
            }}
            ItemSeparatorComponent={() => (
              <View style={styles.separator}></View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
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
});
