import React from "react";
import { commonStyles } from "../../../globalStyle";
import { View } from "react-native-ui-lib";
import FitnessOrg from "../../organisms/FitnessOrg";
import {
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { IMAGES, SCREEN_WIDTH } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { onBack } from "../../../navigation/RootNavigation";

const FitnessTamplet = () => {
  return (
    <>
      <ImageBackground
        source={IMAGES.fitnessGirl}
        style={{ width: SCREEN_WIDTH, height: scale(350) }}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => onBack()}>
          <Image
            source={IMAGES.leftIconWithColor}
            style={{ width: 30, height: 30, margin: 20 }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={[commonStyles.footerContainer, { marginTop: -30 }]}>
        <FitnessOrg />
      </View>
    </>
  );
};

export default FitnessTamplet;
