import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants";
import BottomTabs from "./BottomTabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VetDetailsOld from "../screens/HomeScreen/VetDetailsOld";
import VetDetails from "../screens/HomeScreen/VetDetails";
import AdvertisementForm from "../screens/HomeScreen/AdvertisementForm";
import Privacy from "../screens/HomeScreen/Privacy";
import SearchLocations from "../screens/HomeScreen/SearchLocations";
import OnBoarding from "../screens/AuthScreen/OnBoarding";
import Home from "../screens/HomeScreen/Home";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.HOME} component={Home} />
      <Stack.Screen name={SCREENS.VET_DETAILS} component={VetDetails} />
      <Stack.Screen name={SCREENS.ADVERTISEMENT_FORM} component={AdvertisementForm} />
      <Stack.Screen name={SCREENS.PRIVACY} component={Privacy} />
      <Stack.Screen 
        name={SCREENS.SEARCH_LOCATIONS} 
        component={SearchLocations} 
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
      initialRouteName={SCREENS.VET_DETAILS_OLD}
      tabBar={(e: any) => <BottomTabs {...e} {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={SCREENS.VET_DETAILS_OLD}
        component={VetDetailsOld}
        initialParams={{ index: 0 }}
      />
      <Tab.Screen
        name={SCREENS.VET_DETAILS}
        component={VetDetails}
        initialParams={{ index: 1 }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
