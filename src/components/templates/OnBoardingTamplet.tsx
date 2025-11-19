import React, { useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme, SCREENS } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import { OnBeardingContent } from "../molecules/OnBeardingContent";
import { OnBeardingTopCont } from "../atoms/OnBoardingAtoms/OnBeardingTopCont";
import Animated, { SlideInUp } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/slices/AuthSlice";
import { States } from "../../utils/types";

const OnBoardingTamplet = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: States) => state.Auth);

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        // Set isLoggedIn to true to navigate to dashboard without saving data
        // AppNavigator will automatically show EXERCISE as initial route
        dispatch(LoginUser({
          id: '1',
          access_token: 'dummy-token'
        }));
      }
    }, 5000);
  }, [isLoggedIn]);

  return (
    // <SafeAreaContainer safeArea={false}>
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Animated.View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} entering={SlideInUp.duration(1000)}>
        <Image source={IMAGES.logo} style={{ width: '50%', height: 200, resizeMode: 'contain' }} />
        <Image source={IMAGES.logoText} style={{ width: '50%', height: 100, resizeMode: 'contain' }} />
      </Animated.View>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.color.primary} />
      </View>
    </View>
    // </SafeAreaContainer>
  );
};

export default OnBoardingTamplet;
