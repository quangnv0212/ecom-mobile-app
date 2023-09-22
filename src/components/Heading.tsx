import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";

interface HeadingProps {
  cate: {
    name: string;
    _id: string;
  };
}

const Heading = ({ cate }: HeadingProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{cate.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Category", {
              id: cate._id,
              name: cate.name,
            })
          }
        >
          <Ionicons name="ios-grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    // fontFamily: "semibold",
    fontSize: SIZES.xLarge,
  },
});
