import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/color";
import { SIZES } from "../constants/sizes";

interface ProfileScreenProps {}

const ProfileScreen = (props: ProfileScreenProps) => {
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to log out", [
      { text: "Cancel", onPress: () => console.log("cancel pressed") },
      {
        text: "Continue",
        onPress: async () => {},
      },
    ]);
  };
  const navigation = useNavigation();
  const userLogin = false;
  const userdata = "";
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100" }}>
          <Image
            style={styles.cover}
            source={{
              uri: `https://api-ecom.duthanhduoc.com/images/${userdata?.avatar}`,
            }}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profile}
            source={{
              uri: `https://api-ecom.duthanhduoc.com/images/${userdata?.avatar}`,
            }}
          />
          <Text style={styles.name}>
            {userLogin ? "Vu Quang" : "Please login to your account"}
          </Text>
          {!userLogin ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text>Login</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text>{userdata?.email}</Text>
            </View>
          )}
          {!userLogin ? (
            <View></View>
          ) : (
            <ScrollView>
              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <View style={menuItem(0.2)}>
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Cart</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                >
                  <View style={menuItem(0.2)}>
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <View style={menuItem(0.2)}>
                    <FontAwesome
                      name="language"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Language</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                  <View style={menuItem(0.2)}>
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Log out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -90,
  },
  name: {
    // fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
  },
  menuText: {
    // fontFamily: "regular",
    color: COLORS.gray,
    // marginLeft: 20,
    fontWeight: "600",
    fontSize: 14,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const menuItem = (borderBottomWidth: number) => ({
  borderBottomWidth: borderBottomWidth,
  flexDirection: "row",
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderColor: COLORS.gray,
  gap: SIZES.medium,
});
