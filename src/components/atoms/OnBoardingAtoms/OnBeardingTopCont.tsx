import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import { IMAGES, SCREEN_HEIGHT } from "../../../constants";
import { View } from "react-native-ui-lib";

export const OnBeardingTopCont = (props: any) => {
  return (
      <View
        width={'100%'}
        flex-1
        style={styles.container}
      >
        <ImageBackground
          source={IMAGES.onBoardingImg}
          style={styles.bkImgStyle}
          resizeMode="cover"
        >
          <View style={styles.gradientOverlay}>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              style={styles.gradient}
            />
            <Image
              source={IMAGES.onboardingLogo}
              style={styles.logoStyle}
              resizeMode='contain'
            />
          </View>
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden', 
  },
  bkImgStyle: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  gradient: {
    height: 200,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  logoStyle: {
    width: scale(200),
    height: verticalScale(150),
  },
});
