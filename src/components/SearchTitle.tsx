import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SIZES } from "../constants/sizes";
import { COLORS } from "../constants/color";

interface SearchTitleProps {
  data: any;
}

const SearchTitle = ({ data }: SearchTitleProps) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetail", {
            id: data._id,
          });
        }}
        style={styles.container}
      >
        <View style={styles.image}>
          <Image style={styles.productImg} source={{ uri: data.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{data.name}</Text>
          <Text style={styles.supplier}>
            {data?.price?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    shadowColor: COLORS.lightWhite,
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.small + 2,
    // fontFamily: "bold",
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    // fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
  },
});
