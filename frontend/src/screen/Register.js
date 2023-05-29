import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Oyutnii code"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
