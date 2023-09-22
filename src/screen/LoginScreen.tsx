import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";
import { Input } from "../components";

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <View>
            <Input
              control={control}
              errors={errors}
              label="Email"
              name="email"
              icon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
              }
            />
            <Input
              control={control}
              errors={errors}
              label="Password"
              name="password"
              isPassword={true}
              icon={
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
              }
            />
            <Button
              isValid={Boolean(errors)}
              title="Login"
              onPress={handleSubmit(onSubmit)}
            />
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={{ marginTop: 20, textAlign: "center" }}
            >
              Register
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

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

const btnStyle = (backgroundColor: string) => ({
  height: 50,
  width: "100%",
  backgroundColor: backgroundColor,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
});
