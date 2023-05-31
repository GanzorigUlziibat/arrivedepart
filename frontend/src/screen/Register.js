// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../UserContext';
import axios from 'axios';

const LoginScreen = () => {
  const { updateUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const loginData = {
      username: username,
      password: password,
    };
  
    axios.post('http://arrive.mandakh.org/login', loginData)
      .then(response => {
        if (response.data && response.data.data && response.data.data.length > 0) {
          const userdata = response.data.data[0];
          updateUser(userdata); 
          navigation.navigate('Home');
        } else {
          console.error('Invalid response format111');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Your login form UI */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Нэвтрэх</Text>
      <TextInput
        style={{ width: '50%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Оюутны код"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: '50%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Нууц үг"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Нэвтрэх" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
