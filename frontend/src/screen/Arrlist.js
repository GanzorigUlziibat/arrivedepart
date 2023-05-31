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
const App = ({ navigation }) => {
  // const { detail } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [userid1, setUserid1] = useState();
  const [detail, setDetail] = useState([]);
  useEffect(async () => {
    let useridvalue = await _retrieveData("userid");
    if (useridvalue == null) {
      navigation.navigate("Login");
    } else {
      // console.log(useridvalue, "val");
      setUserid1(useridvalue);
      // console.log(userid1, "id");
    }
    const arrlistData = {
      action: "arrlist",
      // userid: useridvalue,
      userid: 1,
    };

    sendRequest(urlArriveService + "arrlist", arrlistData)
      .then((data) => {
        // setIsLoading(false);
        // setDatas(data);
        // console.log(data);
        console.log(JSON.stringify(data), "arrlist");
        if (data.resultCode == 200)
        {
          data && setDetail(data.data);
          console.log(detail,'detail');
        }
        else
        {
          alert(data.resultMessage);
        }
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });

    getLocation();
  },[]);
 
 

 
  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.item} onPress={() => navigation.navigate('Report', {regdate:item.data})}>
        <View style={styles.item1}><Text style={styles.itemDatetxt}>{item.regdate}</Text></View>
        <View style={styles.item2}><Text style={styles.itemIrsentxt}>{item.irsentsag}</Text></View>
        <View style={styles.item3}><Text style={styles.itemYavsantxt}>{item.yavsantsag}</Text></View>
        <View style={styles.item4}>
            <AntDesign name="caretright" size={20} color="black" />
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.item}>
       
      <View style={styles.item1}><Text style={styles.itemDatetxt}>ОГНОО</Text></View>
      <View style={styles.item2}><Text style={styles.itemIrsentxt1}>ИРСЭН</Text></View>
      <View style={styles.item3}><Text style={styles.itemYavsantxt2}>ЯВСАН</Text></View>
      <View style={styles.item4}>
         
      </View>
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
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 0,
    
  },
  item: {
    paddingVertical: 30,
    fontSize: 18,
    height: 30,
    flexDirection: 'row',
    alignItems:'center',
    
    borderBottomWidth:0.2,
    
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    width: 110,
},
buttonText: {
    color: '#ffffff',
    fontSize: 20,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
item1:{flex:5, },
item2:{flex:3, alignItems:'center'},
item3:{flex:3,  alignItems:'center'},
item4:{flex:1,  alignItems:'flex-end'},
itemDatetxt:{fontSize:20},
itemIrsentxt:{fontSize:20, color:'green'},
itemYavsantxt:{fontSize:20, color:'red'},
itemIrsentxt1:{fontSize:20, color:'black'},
itemYavsantxt2:{fontSize:20, color:'black'}
});

export default App;