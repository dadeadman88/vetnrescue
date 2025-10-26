import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { Text } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import HomeScreen from "../../components/molecules/HomeMol/HomeScreen";
import { Typography } from "../../components/atoms/Typography";
import { IMAGES, theme } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import ZoomTamplet from "../../components/templates/ZoomTamplet";

const ZoomCall = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      {/* <HeaderHome color={theme.color.primary} /> */}
      <ZoomTamplet />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default ZoomCall;
