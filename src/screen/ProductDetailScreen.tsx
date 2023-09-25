import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SIZES } from "../constants/sizes";
import { useNavigation } from "@react-navigation/native";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/color";
import productApi from "../apis/product.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../apis/purchase.api";
import { purchasesStatus } from "../constants/purchases";

interface ProductDetailScreenProps {
  route?: any;
  navigation?: any;
}

const ProductDetailScreen = ({
  route,
  navigation,
}: ProductDetailScreenProps) => {
  const id = route.params.id;
  const [count, setCount] = React.useState(1);
  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  const derementCount = () => {
    setCount((count) => count - 1);
  };
  const addToCartMutation = useMutation(addToCart);
  const queryClient = useQueryClient();
  const buyNow = () => {
    addToCartMutation.mutate(
      { buy_count: count, product_id: id as string },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["purchases", { status: purchasesStatus.inCart }],
          });
        },
      }
    );
  };
  const {
    data: productDetailData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string),
  });
  const data = productDetailData?.data.data;
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={{ margin: 30 }}
          size={SIZES.xxLarge}
          color={COLORS.primary}
        />
      ) : isError ? (
        <Text
          style={{
            margin: 30,
          }}
        >
          Something went wrong
        </Text>
      ) : (
        <>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: data?.image,
            }}
            style={styles.image}
          />

          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{data?.name}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>
                  {data?.price?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: SIZES.large,
                margin: SIZES.large,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Ionicons
                      key={index}
                      style={{ alignItems: "center" }}
                      name="star"
                      size={24}
                      color="gold"
                    />
                  ))}
                </View>
                <Text style={{}}>4.9</Text>
              </View>

              <View style={styles.rating}>
                <TouchableOpacity
                  disabled={count == 1}
                  onPress={() => derementCount()}
                >
                  <SimpleLineIcons name="minus" size={20} />
                </TouchableOpacity>
                <Text style={styles.ratingText}>{count}</Text>
                <TouchableOpacity onPress={() => incrementCount()}>
                  <SimpleLineIcons name="plus" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.descriptionWraper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descText}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repudiandae dignissimos ab veniam alias! Enim dolores error
                consequuntur qui vel tenetur?
              </Text>
            </View>
            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.location}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="location-outline" size={20} />
                  <Text>Hà Nội</Text>
                </View>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={20}
                  />
                  <Text>Free Delivery</Text>
                </View>
              </View>
            </View>
            <View style={styles.cartRow}>
              <TouchableOpacity onPress={buyNow} style={styles.cartBtn}>
                <Text style={styles.cartTitle}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                style={styles.addCart}
              >
                <Fontisto
                  name="shopping-bag"
                  size={20}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionWraper: {
    marginHorizontal: SIZES.large,
  },
  descText: {
    // fontFamily:"regular"
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  title: {
    // fontFamily: "bold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    marginVertical: SIZES.medium,
  },
  price: {
    paddingHorizontal: 10,
    // fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    justifyContent: "center",
    // fontFamily:"medium"
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartTitle: {
    // fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  cartRow: {
    // paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
