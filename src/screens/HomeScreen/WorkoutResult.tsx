import React, { useEffect } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import WorkOutTamplet from "../../components/templates/WorkOutTamplet";
import { Typography } from "../../components/atoms/Typography";
import { Image, TouchableOpacity, View } from "react-native-ui-lib";
import { commonStyles } from "../../globalStyle";
import WorkoutSummaryContent from "../../components/atoms/WorkoutAtoms/WorkoutSummaryContent";
import WorkoutSummary from "../../components/atoms/WorkoutAtoms/WorkoutSummary";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { BackHandler } from "react-native";

const WorkoutResult = () => {

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }
  }, [])

  const onBackPress = () => {
    onBack()
    onBack()
    return true;
  }

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <TouchableOpacity paddingH-20 onPress={() => {
        onBack()
        onBack()
      }}>
        <Image
          source={IMAGES.leftIconWithColor}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <View marginV-20 style={commonStyles.footerContainer}>
        <WorkoutSummaryContent />
        <Typography textType="bold" style={{ marginLeft: 20 }}>Workout Summary</Typography>
        <WorkoutSummary />
      </View>
    </SafeAreaContainer>
  );
};

export default WorkoutResult;
