import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";
import { useQuery } from "@tanstack/react-query";
import productApi from "../apis/product.api";
import { ProductCardView } from "../components/product";
import SearchTitle from "../components/SearchTitle";
interface SearchProps {}

const Search = (props: SearchProps) => {
  const [searchKey, setsearchKey] = React.useState("");
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", { limit: 30, page: 1, name: searchKey }],
    queryFn: () => {
      return productApi.getProducts({ limit: 10, page: 1, name: searchKey });
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.white}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={(text) => {
              setsearchKey(text);
            }}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {productsData?.data.data.products.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            style={styles.serachImage}
            source={{
              uri: "https://www.nicepng.com/png/full/77-779902_information-f-a-q-s-and-more-searching.png",
            }}
          />
        </View>
      ) : (
        <FlatList
          data={productsData?.data.data.products}
          renderItem={(item) => <SearchTitle data={item.item} />}
          contentContainerStyle={styles.container}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    // fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  serachImage: {
    resizeMode: "contain",
    // width: SIZES.width - 80,
    height: SIZES.height - 100,
    opacity: 0.9,
  },
  separator: {
    height: 16,
  },
});

const welcomeTxt = (color: string, top: number) => ({
  // fontFamily: "Poppins-Bold",
  fontSize: SIZES.xxLarge - 6,
  marginTop: top,
  color: color,
  marginHorizontal: 12,
});
