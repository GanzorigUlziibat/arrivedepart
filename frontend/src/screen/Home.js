import React, { useState, useEffect, useContext } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { useNavigation } from "@react-navigation/native";

import {
  sendRequest,
  urlArriveService,
  _storeData,
  _retrieveData,
} from "../Methods";

export default function App({ navigation }) {
  const [displayText, setDisplayText] = useState("Цагаа бүртгүүлнэ үү");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [detail, setDetail] = useState({});
  const [userid1, setUserid1] = useState();
  let useridvalue;

  

  useEffect(() => {
    let useridvalue;
    async function fetchData() {
      useridvalue = await _retrieveData("userid");
      if (useridvalue == null) {
        navigation.navigate("Login");
      } else {
        console.log(useridvalue, "val");
        setUserid1(useridvalue);
        console.log(userid1, "id");
      }
    }

    fetchData();
    getLocation();
  }, []);

  useEffect(() => {
    const getUsersData = {
      action: "getuser",
      userid: userid1,
    };

    sendRequest(urlArriveService + "getuser", getUsersData)
      .then((data) => {
        // setIsLoading(false);
        // setDatas(data);
        console.log(data, "datas");
        if (data.resultCode == 200) {
          setDetail(data.data[0]);
        } else {
          alert(data.resultMessage);
        }
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });
  }, [userid1]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location);
      } else {
        setDisplayText("Location permission denied");
      }
    } catch (error) {
      console.log("Error getting location:", error);
      setDisplayText("Error getting location");
    }
  };

  const insertArriveDepart = (userid, codearr) => {
    const arrdepData = {
      action: "arrdep",
      userid: userid,
      codearr: codearr,
    };

    sendRequest(urlArriveService + "arrdep", arrdepData)
      .then((data) => {
        // setIsLoading(false);
        // setDatas(data);
        if (data.resultCode == 200) {
          // navigation.navigate("Home", { detail: data.data });
          // console.log(data.data[0].userid);
          _storeData("userid", data.data[0].userid);
        } else {
          alert(data.resultMessage);
        }
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });
  };

  const handleButtonPress = (text) => {
    if (currentLocation) {
      const officeLocation = { latitude: 47.9203302, longitude: 106.8832056 }; // Replace with your office location coordinates
      const distance = geolib.getDistance(
        currentLocation.coords,
        officeLocation,
      console.log(currentLocation.coords, "online"),
      console.log(officeLocation, "off"),
      );
      if (distance <= 50) {
        if (text === "Arrive") {
          insertArriveDepart(detail.userid, 1)
          setDisplayText("Тавтай морил");
        } else if (text === "Depart") {
          insertArriveDepart(detail.userid, 2)
          setDisplayText("Баяртай");
        } else if (text === "Button 3");
      } else {
        setDisplayText("Та энд байхгүй байна");
        alert(distance + " m");
      }
    } else {
      setDisplayText("Цагаа бүртгүүлнэ үү");

    }
    App({navigation})
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
      <View style={styles.buttonContainer}>
        <Text>Тавтай Морил {detail.firstname}!</Text>
        <Pressable
          style={styles.button}
          onPress={() => handleButtonPress("Arrive")}
        >
          <Text style={styles.buttonText}>Ирсэн</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => handleButtonPress("Depart")}
        >
          <Text style={styles.buttonText}>Явсан</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Arrlist")}
        >
          <Text style={styles.buttonText}>Ирц харах</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
