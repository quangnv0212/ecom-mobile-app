import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Checkbox from "expo-checkbox";
import * as React from "react";
import Toast from "react-native-toast-message";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { deletePurchase, updatePurchase } from "../../apis/purchase.api";
import { COLORS } from "../../constants/color";
import { SIZES } from "../../constants/sizes";
import { AppContext } from "../../contexts/app.context";
import { Purchase } from "../../types/purchase.type";
import { SuccessResponse } from "../../types/utils.type";

interface CardCartViewProps {
  data: any;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<SuccessResponse<Purchase[]>, any>,
      unknown
    >
  >;
}

const CardCartView = ({ data, refetch }: CardCartViewProps) => {
  const [quantity, setquantity] = React.useState(
    data.item.buy_count.toString()
  );
  const { setExtendedPurchases, extendedPurchases } =
    React.useContext(AppContext);
  const handleRemoveItem = () => {
    deletePurchasesMutation.mutate([data.item._id.toString()]);
  };
  const deletePurchasesMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Delete purchase successfully",
      });
      refetch();
    },
  });
  const handleAddItem = () => {
    setquantity((prev) => (Number(prev) + 1).toString());
    setExtendedPurchases((prev) =>
      prev.map((x) =>
        x._id === data.item._id ? { ...x, buy_count: x.buy_count + 1 } : x
      )
    );
    updatePurchaseMutation.mutate({
      product_id: data.item.product._id,
      buy_count: data.item.buy_count + 1,
    });
  };
  const handleMinusItem = () => {
    if (data.item.buy_count !== 1) {
      setquantity((prev) => (Number(prev) - 1).toString());

      setExtendedPurchases((prev) =>
        prev.map((x) =>
          x._id === data.item._id ? { ...x, buy_count: x.buy_count - 1 } : x
        )
      );
      updatePurchaseMutation.mutate({
        product_id: data.item.product._id,
        buy_count: data.item.buy_count - 1,
      });
    }
  };
  const handleUpdatePurchase = (quantity: number) => {
    updatePurchaseMutation.mutate({
      buy_count: quantity,
      product_id: data.item.product._id,
    });
    setExtendedPurchases((prev) =>
      prev.map((x) =>
        x._id === data.item._id ? { ...x, buy_count: quantity } : x
      )
    );
  };
  const handleCheckItem = (purchaseIndex: number) => {
    return async (value: boolean) => {
      try {
        setExtendedPurchases((prev) =>
          prev.map((x, index) =>
            index === purchaseIndex ? { ...x, checked: value } : x
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
  };
  const updatePurchaseMutation = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      refetch();
      Toast.show({
        type: "success",
        text1: "Update purchase successfully",
      });
    },
  });

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
            value={quantity}
            inputMode="decimal"
            onChangeText={(text) => setquantity(text)}
            onEndEditing={(text) => {
              console.log(text.nativeEvent.text);
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
