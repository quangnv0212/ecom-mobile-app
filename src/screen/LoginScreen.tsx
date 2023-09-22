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
  const [obsecureText, setObsercureText] = React.useState(true);
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <Controller
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="email"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorMessage}>This is required.</Text>
              )}
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      secureTextEntry={obsecureText}
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setObsercureText((prev) => !prev);
                  }}
                >
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorMessage}>This is required.</Text>
              )}
            </View>
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
