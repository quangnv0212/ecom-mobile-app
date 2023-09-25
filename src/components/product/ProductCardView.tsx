import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SIZES } from "../../constants/sizes";
import { COLORS } from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../apis/purchase.api";
import { purchasesStatus } from "../../constants/purchases";
import Toast from "react-native-toast-message";

interface ProductCardViewProps {
  data: Product;
}

const ProductCardView = ({ data }: ProductCardViewProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const addToCartMutation = useMutation(addToCart);
  const addToCartHandler = () => {
    addToCartMutation.mutate(
      { buy_count: 1, product_id: data._id as string },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["purchases", { status: purchasesStatus.inCart }],
          });
          Toast.show({
            type: "success",
            text1: "Add to cart successfully",
          });
        },
      }
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", {
          id: data._id,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: data.image,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.supplier} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            Sold: {data.sold}
          </Text>

          <Text style={styles.price} numberOfLines={1}>
            {data?.price?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={addToCartHandler} style={styles.addBtn}>
          <Ionicons name="add-circle" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 182 / 1.3,
    height: 240 / 1.3,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 170 / 1.3,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: { aspectRatio: 1, resizeMode: "cover" },
  details: {
    padding: SIZES.small,
  },
  title: {
    // fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  supplier: {},
  price: {
    // fontFamily: "medium",
    fontSize: SIZES.large / 1.3,
    marginBottom: 2,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
