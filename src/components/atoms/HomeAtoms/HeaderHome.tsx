import React from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { Typography } from "../Typography";

const HeaderHome = (props: any) => {
  const {
    color = theme.color.primary,
    headerBkColor = "transparent",
    abs = false,
  } = props;
  return (
    <View
      backgroundColor={headerBkColor}
      style={abs ? { position: "absolute", left: 0, right: 0 } : {}}
    >
      <Image
        source={IMAGES.homeHeaderImg}
        style={{ ...styles.image, tintColor: color }}
        resizeMode="stretch"
      />
      <Image
        source={IMAGES.headerLogo}
        style={{
          width: 35,
          height: 55,
          alignSelf: "center",
          marginTop: -35,
          tintColor: color,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: verticalScale(45),
    backgroundColor: "transparent",
    // marginTop: -25,
  },
});

export default HeaderHome;
