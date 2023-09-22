import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants/color";

interface ButtonProps {
  title: string;
  onPress?: any;
  isValid?: boolean;
  loader?: boolean;
}

const Button = ({ title, onPress, isValid, loader }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnStyle(!isValid ? COLORS.gray : COLORS.primary)}
    >
      {!loader ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  btnTxt: {
    // fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
});

const btnStyle = (backgroundColor: string) => ({
  height: 50,
  width: "100%",
  backgroundColor: backgroundColor,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
});
