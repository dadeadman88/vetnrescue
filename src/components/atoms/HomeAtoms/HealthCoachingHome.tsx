import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import { IMAGES, SCREEN_HEIGHT, SCREEN_WIDTH, SCREENS, theme } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { Typography } from "../Typography";
import { navigate } from "../../../navigation/RootNavigation";

const HealthCoachingHome = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigate(SCREENS.HEALTH_COACHING, { index: 0 })}>
      <ImageBackground
        source={IMAGES.healthCoach}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.45
        }}
        resizeMode="cover"
      >
        <View flex center>
          <TouchableOpacity onPress={() => navigate(SCREENS.HEALTH_COACHING, { index: 0 })}>
            <Typography
              color={theme.color.white}
              align="center"
              textType="semiBold"
              size={theme.fontSize.extraLarge}
            >
              Health Coaching
            </Typography>
            <Typography color={theme.color.white} size={theme.fontSize.extraSmall12}>
              What is Board Certified Health Coaching
            </Typography>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default HealthCoachingHome;
