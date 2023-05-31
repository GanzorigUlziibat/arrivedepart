import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import ArrlistScreen from './src/screen/Arrlist';
import DescScreen from './src/screen/Desc';
import RegisterScreen from './src/screen/Register';
import ReportScreen from './src/screen/Report';
import UserProvider from './src/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setIsLogged(true);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLogged ? 'Home' : 'Login'}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Arrlist" component={ArrlistScreen} />
          <Stack.Screen name="Desc" component={DescScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
          {/* Add a login screen */}
          {!isLogged && <Stack.Screen name="Login" component={RegisterScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
