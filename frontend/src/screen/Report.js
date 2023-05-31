import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {
  sendRequest,
  urlArriveService,
  _storeData,
  _retrieveData,
} from "../Methods";
const AcceptCancelBox = ({ route,  navigation}) => {
  const { regdate } = route.params;
  const [detail, setDetail] = useState([]);
  const [text, setText] = useState('');
  useEffect(async () => {
    // let useridvalue = await _retrieveData("userid");
    // if (useridvalue == null) {
    //   navigation.navigate("Login");
    // } else {
    //   // console.log(useridvalue, "val");
    //   setUserid1(useridvalue);
    //   // console.log(userid1, "id");
    // }
    const reportListData = {
      action: "reportlist",
      // userid: useridvalue,
      userid: 1,
      date : JSON.stringify(regdate)
    };
    console.log(reportListData, "reportlist")
    sendRequest(urlArriveService + "reportlist", reportListData)
      .then((data) => {
        // setIsLoading(false);
        // setDatas(data);
        // console.log(data);
        console.log(JSON.stringify(data), "arrlist");
        // if (data.resultCode == 200)
        // {
        //   data && setDetail(data.data);
        //   console.log(detail,'detail');
        // }
        // else
        // {
        //   alert(data.resultMessage);
        // }
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });

    getLocation();
  },[]);
  
  const handleAccept = () => {
    console.log('Accepted:', text);
    // Perform accept logic here
  };

  const handleCancel = () => {
    console.log('Cancelled');
    navigation.goBack();
    // Perform cancel logic here
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{regdate}{detail} өдрийн тайлан:</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Хадгалах</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Болих</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#61bd4f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#e02c2c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AcceptCancelBox;
