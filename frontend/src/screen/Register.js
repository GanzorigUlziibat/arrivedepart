// LoginScreen.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  sendRequest,
  urlArriveService,
  _storeData,
  _retrieveData,
} from "../Methods";
const LoginScreen = ({ navigation }) => {
  // const { updateUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const userid = await _retrieveData("userid");
      if (userid != null) {
        navigation.navigate("Home");
      }
    }
    fetchData();
  }, []);

  // Persisting data:

  const handleLogin = async () => {
    const loginData = {
      action: "login",
      username: username,
      password: password,
    };

    // console.log(loginData);

    const response = await sendRequest(urlArriveService + "login", loginData);

    if (response.resultCode == 200) {
      // navigation.navigate("Home", { detail: data.data });
      // console.log(data.data[0].userid);
      _storeData("userid", response.data[0].userid);
      navigation.navigate("Home", { userid: response.data[0].userid });
    } else {
      alert(response.resultMessage);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView>
        <View
          style={{
            height: 500,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Your login form UI */}
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Нэвтрэх</Text>
          <TextInput
            style={{
              width: "50%",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
            }}
            placeholder="Оюутны код"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={{
              width: "50%",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
            }}
            placeholder="Нууц үг"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>Нэвтрэх</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default LoginScreen;
