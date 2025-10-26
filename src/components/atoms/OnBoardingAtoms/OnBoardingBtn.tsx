import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, theme } from "../../../constants";


export const OnBoardingBtn = (props:any) => {
    const {onPress = ()=>{}} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
      <Typography size={theme.fontSize.large} color={"#000"}>
        Get Started
      </Typography>
      
      <View style={styles.iconView}>
        <Image source={IMAGES.rightArrow} style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginTop:50,
    width: scale(200),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme.color.white,
  },
  iconView: {
    borderRadius: 30,
    padding: 10,
    backgroundColor:theme.color.primary
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor:  theme.color.white,
  },
});
