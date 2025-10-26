import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import Login from "../screens/AuthScreen/Login";
import OnBoarding from "../screens/AuthScreen/OnBoarding";
import SignUp from "../screens/AuthScreen/SignUp";
import ForgotPass from "../screens/AuthScreen/ForgotPass";


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

      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
     <Stack.Screen name={SCREENS.FORGOT} component={ForgotPass} />

    </Stack.Navigator>
  );
};

