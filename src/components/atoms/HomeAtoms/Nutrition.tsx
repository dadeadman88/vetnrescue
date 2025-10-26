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

const Nutrition = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigate(SCREENS.NUTRITION_DETAIL)}>
      <ImageBackground
        source={IMAGES.Nutrition}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.4
        }}
        resizeMode="cover"
      >
        <TouchableOpacity style={{ flex: 1,paddingTop:"45%" }} onPress={() => navigate(SCREENS.NUTRITION_DETAIL)}>
          <View center>
            <Typography
              color={theme.color.white}
              align="center"
              textType="semiBold"
              size={theme.fontSize.extraLarge}
            >
              Nutrition
            </Typography>
            <Typography
              color={theme.color.white}
              size={theme.fontSize.extraSmall12}
            >
              What is Nutrition Coachng?
            </Typography>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default Nutrition;
