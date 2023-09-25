import { View, Text } from "react-native";
import React from "react";

export default function QuantityController() {
  return (
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
  );
}
