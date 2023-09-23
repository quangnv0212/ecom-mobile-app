import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/color";
import { SIZES } from "../../constants/sizes";
import { AppContext } from "../../contexts/app.context";

interface CardCartViewProps {
  data: any;
}

const CardCartView = ({ data }: CardCartViewProps) => {
  console.log(data);
  const { setExtendedPurchases } = React.useContext(AppContext);
  const handleRemoveItem = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddItem = async () => {
    try {
      // setextendedPurchase((prev) =>
      //   prev.map((x) =>
      //     x._id === data.item._id ? { ...x, buy_count: x.buy_count + 1 } : x
      //   )
      // );
      // const res = await updatePurchase({
      //   product_id: data.item.product._id,
      //   buy_count: data.item.buy_count + 1,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinusItem = async () => {
    try {
      // if (data.item.buy_count !== 1) {
      //   setextendedPurchase((prev) =>
      //     prev.map((x) =>
      //       x._id === data.item._id ? { ...x, buy_count: x.buy_count - 1 } : x
      //     )
      //   );
      //   const res = await updatePurchase({
      //     product_id: data.item.product._id,
      //     buy_count: data.item.buy_count - 1,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdatePurchase = async (quantity: number) => {
    try {
      // setextendedPurchase((prev) =>
      //   prev.map((x) =>
      //     x._id === data.item._id ? { ...x, buy_count: quantity } : x
      //   )
      // );
      // const res = await updatePurchase({
      //   buy_count: quantity,
      //   product_id: data.item.product._id,
      // });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [quantity, setquantity] = React.useState(data.item.buy_count);
  const handleCheckItem = (productIndex: number) => {
    return async (value: boolean) => {
      try {
        setExtendedPurchases((prev) =>
          prev.map((x, index) =>
            index === productIndex ? { ...x, checked: value } : x
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
  };
  return (
    <View style={styles.favContainer}>
      <Checkbox
        style={{ marginRight: 8 }}
        value={data.item?.checked}
        onValueChange={handleCheckItem(data.index)}
        color={data.item?.checked ? COLORS.primary : undefined}
      />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data.item?.product.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.fav}>
          {data.item?.product.name}
        </Text>
        <Text style={styles.supplier}>
          {data.item?.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
        <View style={{ flexDirection: "row", gap: 5, marginVertical: 15 }}>
          <TouchableOpacity onPress={handleMinusItem}>
            <AntDesign name="minuscircleo" size={20} color="black" />
          </TouchableOpacity>
          <TextInput
            style={{
              borderWidth: 1,
              width: 50,
              textAlign: "center",
            }}
            defaultValue={data.item?.buy_count.toString()}
            value={quantity}
            inputMode="decimal"
            onChangeText={(text) => setquantity(text)}
            onEndEditing={(text) => {
              handleUpdatePurchase(Number(text.nativeEvent.text));
            }}
          />
          <TouchableOpacity onPress={handleAddItem}>
            <AntDesign name="pluscircleo" size={20} color="black" />
          </TouchableOpacity>
          <Text>
            {(data.item?.buy_count * data.item?.price).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ position: "absolute", right: 2 }}>
        <SimpleLineIcons
          onPress={handleRemoveItem}
          name="trash"
          size={20}
          color={COLORS.red}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardCartView;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
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
  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  fav: {
    // fontFamily: "bold",
    color: COLORS.gray,
    fontSize: SIZES.medium,
  },
  supplier: {
    color: COLORS.gray,
    fontSize: 14,
  },
});
