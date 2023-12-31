import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BodyUpdateProfile, getProfile, updateProfile } from "../apis/user.api";
import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";
import { Avatar } from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../contexts/app.context";
type FormData = {
  name: string;
  address: string;
  phone: string;
  date_of_birth: Date;
  avatar: string;
};
export default function EditProfileScreen() {
  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { setProfile } = React.useContext(AppContext);
  const navigation = useNavigation();
  const profile = profileData?.data.data;
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
  });
  const [image, setImage] = React.useState();
  const uploadImage = async (uri: any) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "image.jpg",
      type: "image/jpg",
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "https://api-ecom.duthanhduoc.com/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(token!),
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    if (profile) {
      setImage(`https://api-ecom.duthanhduoc.com/images/${profile.avatar}`);
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1990, 0, 1)
      );
    }
  }, [profile, setValue]);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateProfile(data as any);
      setProfile(res.data.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <View style={{ position: "relative" }}>
          <Avatar
            autoColor
            size={150}
            image={{
              uri: image,
            }}
          />

          <Feather
            onPress={pickImage}
            style={{ position: "absolute", right: 0, bottom: 0 }}
            name="edit"
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 30 }}>
        <Input
          control={control}
          name="name"
          errors={errors}
          label="Name"
          icon={
            <MaterialCommunityIcons
              name="rename-box"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
          }
        />
        <Input
          control={control}
          name="phone"
          errors={errors}
          label="Phone"
          icon={
            <MaterialCommunityIcons
              name="phone"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
          }
        />
        <Input
          control={control}
          name="address"
          errors={errors}
          label="Address"
          icon={
            <MaterialCommunityIcons
              name="home"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
          }
        />
        <Button
          isValid={Boolean(errors)}
          title="Update"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
    width: "90%",
  },
  heading: {
    // fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
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
