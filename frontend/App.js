import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/Home";
import ArrlistScreen from "./src/screen/Arrlist";
import DescScreen from "./src/screen/Desc";
import RegisterScreen from "./src/screen/Register";
import ReportScreen from "./src/screen/Report";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Home"
          options={{ title: "Цаг бүртгэл", headerBackVisible: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Arrlist"
          options={{ title: "ДЭЛГЭРЭНГҮЙ" }}
          component={ArrlistScreen}
        />
        <Stack.Screen name="Desc" component={DescScreen} />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false, headerBackButtonMenuEnabled: false }}
          component={RegisterScreen}
        />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
