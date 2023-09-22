import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SIZES } from "../../constants/sizes";
import productApi from "../../apis/product.api";
import { useQuery } from "@tanstack/react-query";
import { COLORS } from "../../constants/color";
import ProductCardView from "./ProductCardView";

interface ProductRowProps {
  category: string;
}
const ProductRow = ({ category }: ProductRowProps) => {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", { limit: 10, page: 1 }],
    queryFn: () => {
      return productApi.getProducts({ limit: 10, page: 1 });
    },
  });
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xLarge} color={COLORS.primary} />
      ) : isError ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={productsData?.data.data.products}
          renderItem={({ item }) => <ProductCardView data={item} />}
          horizontal
          contentContainerStyle={{ columnGap: 0 }}
        />
      )}
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  container: {},
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: 44,
    zIndex: 999,
  },
});
