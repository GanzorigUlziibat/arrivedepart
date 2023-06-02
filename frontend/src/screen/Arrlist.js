import React, { useEffect, useState, useRef, useContext } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import axios from "axios";
import { Table, Row, Rows } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";
import {
  sendRequest,
  urlArriveService,
  _storeData,
  _retrieveData,
} from "../Methods";
const App = ({ route, navigation }) => {
  const { userid } = route.params;
  const [detail, setDetail] = useState([]);
  // const [userid1, setUserid1] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const arrlistData = {
        action: "arrlist",
        userid: userid,
      };
      console.log(arrlistData, "arrlistData");
      try {
        const response = await sendRequest(
          urlArriveService + "arrlist",
          arrlistData
        );

        if (response.resultCode == 200) {
          response && setDetail(response.data);
        } else {
          alert(response && response.resultMessage);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("Report", {
            userid: userid,
            regdate: item.regdate,
          })
        }
      >
        <View style={styles.item1}>
          <Text style={styles.itemDatetxt}>{item.regdate}</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.itemIrsentxt}>{item.irsentsag}</Text>
        </View>
        <View style={styles.item3}>
          <Text style={styles.itemYavsantxt}>{item.yavsantsag}</Text>
        </View>
        <View style={styles.item4}>
          <AntDesign name="caretright" size={20} color="black" />
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.item}>
        <View style={styles.item1}>
          <Text style={styles.itemDatetxtHeader}>ОГНОО</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.itemDatetxtHeader}>ИРСЭН</Text>
        </View>
        <View style={styles.item3}>
          <Text style={styles.itemDatetxtHeader}>ЯВСАН</Text>
        </View>
        <View style={styles.item4}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <View style={styles.container}>
        <FlatList
          data={detail}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 0,
  },
  item: {
    paddingVertical: 18,
    // fontSize: 18,
    // height: 30,
    flexDirection: "row",
    // alignItems: "center",

    borderBottomWidth: 0.2,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    width: 110,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item1: { flex: 5 },
  item2: { flex: 3, alignItems: "center" },
  item3: { flex: 3, alignItems: "center" },
  item4: { flex: 1, alignItems: "flex-end" },
  itemDatetxt: { fontSize: 20 },
  itemIrsentxt: { fontSize: 20, color: "green" },
  itemYavsantxt: { fontSize: 20, color: "red" },
  itemDatetxtHeader: { fontSize: 20, fontWeight: "bold" },
  // itemIrsentxt1Header: { fontSize: 20, color: "black" },
  // itemYavsantxt2Header: { fontSize: 20, color: "black" },
});

export default App;
