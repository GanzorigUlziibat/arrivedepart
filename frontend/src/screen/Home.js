import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { useNavigation } from "@react-navigation/native";

import {
  sendRequest,
  urlArriveService,
  _storeData,
  _retrieveData,
} from "../Methods";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ route, navigation }) {
  const { userid } = route.params;
  //   let userid = 30;

  //   let userid;

  //   useEffect(() => {
  //     async function fetchData() {
  //       const userid = await _retrieveData("userid");
  //       if (userid == null) {
  //         navigation.navigate("Register");
  //       }
  //     }

  //     fetchData();
  //   });

  const [displayText, setDisplayText] = useState("Цагаа бүртгүүлнэ үү");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [detail, setDetail] = useState({});
  //   const [userid1, setUserid1] = useState();
  //   47.927595, 106.889073
  const officeLocation = { latitude: 47.927595, longitude: 106.889073 }; // Replace with your office location coordinates

  useEffect(() => {
    let useridvalue;
    // async function fetchData() {
    //   useridvalue = await _retrieveData("userid");
    //   if (useridvalue == null) {
    //     navigation.navigate("Register");
    //   } else {
    //     // console.log(useridvalue, "val");
    //     setUserid1(useridvalue);
    //     // console.log(userid1, "id");
    //   }
    // }

    // fetchData();
    getLocation();
  }, []);

  useEffect(() => {
    const getUsersData = {
      action: "getuser",
      userid: userid,
    };
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          urlArriveService + "getuser",
          getUsersData
        );
        // console.log(response);
        if (response.resultCode == 200) {
          setDetail(response.data[0]);
        } else {
          alert(data && data.resultMessage);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []);

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
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          urlArriveService + "arrdep",
          arrdepData
        );
        // console.log(response);
        if (response.resultCode == 200) {
          console.log(response && response.resultMessage);
        } else {
          alert(response && response.resultMessage);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    fetchData();
  };

  const handleButtonPress = (text) => {
    if (currentLocation) {
      const distance = geolib.getDistance(
        currentLocation.coords,
        officeLocation
      );
      //   console.log(currentLocation.coords, "Current location");
      //   console.log(officeLocation, "office location");

      //   if (distance <= 50000000000000000) {
      if (distance <= 50) {
        if (text === "Arrive") {
          insertArriveDepart(detail.userid, 1);
          setDisplayText("Тавтай морил");
          alert("Ажилдаа ирсэн танд баярлалаа");
        } else if (text === "Depart") {
          insertArriveDepart(detail.userid, 2);
          alert("Бүртгэгдлээ. Баяртай");
          setDisplayText("Баяртай");
        }
      } else {
        setDisplayText("Та ажил дээрээ байхгүй байна");
        alert("Та ажил дээрээ байхгүй байна" + distance + " метр");
      }
    } else {
      setDisplayText("Цагаа бүртгүүлнэ үү");
    }
  };

  async function removeAsyncStorage() {
    await AsyncStorage.removeItem("userid");
    navigation.navigate("Register");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
      <View style={styles.buttonContainer}>
        <Text>Тавтай Морил {detail.firstname}!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Arrive")}
        >
          <Text style={styles.buttonText}>Ирсэн</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Depart")}
        >
          <Text style={styles.buttonText}>Явсан</Text>
        </TouchableOpacity>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Arrlist", { userid: userid })}
        >
          <Text style={styles.buttonText}>Ирц харах</Text>
        </Pressable>
        <Button
          title="remove AsyncStorage"
          onPress={() => removeAsyncStorage()}
        ></Button>
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
