import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import OnBoarding from "../screens/AuthScreen/OnBoarding";


const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false,
  animation: "fade",
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoarding" screenOptions={screenOptionStyle}>
      <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
    </Stack.Navigator>
  );
};

