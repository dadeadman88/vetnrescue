import React from "react";
import { StyleSheet, Image, ImageBackground, TouchableOpacity, Platform } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { IMAGES, SCREEN_HEIGHT, SCREEN_WIDTH, SCREENS, theme } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { Typography } from "../Typography";
import { navigate } from "../../../navigation/RootNavigation";

const Fitness = () => {
  return (
    <ImageBackground
      source={IMAGES.homeMiddleImg}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.5,
        // backgroundColor:"red"
      }}
      resizeMode="stretch"
    >
      <View flex center>
        <TouchableOpacity onPress={() => navigate(SCREENS.HEALTH_COACHING, { index: 1 })}>
          <Typography
            color={theme.color.white}
            align="center"
            textType="semiBold"
            size={theme.fontSize.extraLarge}
          >
            Fitness
          </Typography>
          <Typography color={theme.color.white} size={theme.fontSize.extraSmall12}>
            Why Choose on Elite Personal Trainer ?
          </Typography>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Fitness;
