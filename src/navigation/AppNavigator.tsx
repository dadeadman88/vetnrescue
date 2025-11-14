import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants";
import BottomTabs from "./BottomTabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/HomeScreen/Profile";
import HealthCoaching from "../screens/HomeScreen/HealthCoaching";
import FitnessDetail from "../screens/HomeScreen/FitnessDetail";
import EditProfile from "../screens/HomeScreen/EditProfile";
import Privacy from "../screens/HomeScreen/Privacy";
import ChangePassword from "../screens/HomeScreen/ChangePassword";
import AddMood from "../screens/HomeScreen/AddMood";
import OnBoarding from "../screens/AuthScreen/OnBoarding";
import Notification from "../screens/HomeScreen/Notification";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.HOME} component={BottomTabNavigation} />
      <Stack.Screen name={SCREENS.FITNESS_DETAIL} component={FitnessDetail} />
      <Stack.Screen name={SCREENS.NOTIFICATION} component={Notification} />
      <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={SCREENS.CHANGE_PASS} component={ChangePassword} />
      <Stack.Screen name={SCREENS.PRIVACY} component={Privacy} />
      <Stack.Screen 
        name={SCREENS.ADD_MOOD} 
        component={AddMood} 
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = (props: any) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HEALTH_COACHING}
      tabBar={(e: any) => <BottomTabs {...e} {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={SCREENS.HEALTH_COACHING}
        component={HealthCoaching}
        initialParams={{ index: 0 }}
      />
      <Tab.Screen
        name={SCREENS.FITNESS_DETAIL}
        component={FitnessDetail}
        initialParams={{ index: 1 }}
      />
      <Tab.Screen
        name={SCREENS.NOTIFICATION}
        component={Notification}
        initialParams={{ index: 2 }}
      />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
