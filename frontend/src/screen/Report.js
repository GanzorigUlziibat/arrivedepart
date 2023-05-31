import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AcceptCancelBox = ({ route, navigation }) => {
  const { regdate } = route.params;

  const [text, setText] = useState("");

  const handleAccept = () => {
    console.log("Accepted:", text);
    // Perform accept logic here
  };

  const handleCancel = () => {
    console.log("Cancelled");
    navigation.goBack();
    // Perform cancel logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{regdate} өдрийн тайлан:</Text>
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#61bd4f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#e02c2c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AcceptCancelBox;
