import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { IMAGES, SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { onBack } from "../../../navigation/RootNavigation";
import { View } from "react-native-ui-lib";

const NutrtionTopView = (props: any) => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.4,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.25,
          position: "absolute",
        }}
      >
        <Image
          source={IMAGES.dishes_back}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.25,
            position: "absolute",
          }}
          resizeMode="stretch"
        />
        <Image
          source={IMAGES.nutritionHeader}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.25,
            position: "absolute",
            opacity:0.9
          }}
          resizeMode="stretch"
        />
      </View>
      <TouchableOpacity onPress={() => onBack()}>
        <Image
         // source={IMAGES.leftIconWithColor}
          style={{
            width: 30,
            height: 30,
            marginTop: 30,
            marginHorizontal: 20,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Image
        source={IMAGES.dishes}
        style={{
          width: scale(250),
          height: verticalScale(250),
          alignSelf: "center",
          top: -verticalScale(50),
        }}
        resizeMode="contain"
      />
    </View>
  );
};
export default NutrtionTopView;
