import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import ArrlistScreen from './src/screen/Arrlist';
import DescScreen from './src/screen/Desc';
import  RegisterScreen from './src/screen/Register';
import  LoginScreen from './src/screen/Login';
import  ReportScreen from './src/screen/Report';
import UserProvider from './src/UserProvider';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Arrlist' component={ArrlistScreen} />
        <Stack.Screen name="Desc" component={DescScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

export default App;