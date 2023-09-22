import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormData } from "../screen/LoginScreen";
interface InputProps {
  icon: any;
  label: string;
  control: Control<FormData, any>;
  errors: FieldErrors<FieldValues>;
  name: string;
  isPassword?: boolean;
}
export default function Input({
  icon,
  label,
  control,
  errors,
  name,
  isPassword = false,
}: InputProps) {
  const [obsecureText, setObsercureText] = React.useState(isPassword);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon}
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={obsecureText}
              autoCapitalize="none"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name={name}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => {
              setObsercureText((prev) => !prev);
            }}
          >
            <MaterialCommunityIcons
              name={obsecureText ? "eye-outline" : "eye-off-outline"}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors.email && (
        <Text style={styles.errorMessage}>This is required.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {},
  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
    // fontFamily:"regular"
  },
  buttonInner: {},
  input: { width: "80%" },
  container: {},
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    // fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    // fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  inputWrapper: {
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
});
