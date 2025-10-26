import React from "react";
import HealthCoachingOrg from "../../organisms/HealthCoachingOrg";
import { commonStyles } from "../../../globalStyle";
import { View } from "react-native-ui-lib";
import HomeDetailTopView from "../../atoms/HomeAtoms/HomeDetailTopView";
import NutrtionTopView from "../../atoms/HomeAtoms/NutrtionTopView";
import NutritionOrg from "../../organisms/NutritionOrg";
import NutrationMol from "../../molecules/NutrationMol/NutrationMol";
import { useSelector } from "react-redux";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { navigate } from "../../../navigation/RootNavigation";
import { SCREENS } from "../../../constants";

const NutritionTamplet = () => {
  const { AllCategoryData } = useSelector((state) => state.Main);

  return (
    <>
      <NutrtionTopView />
      <View
        style={{
          ...commonStyles.footerContainer,
          marginTop: -80,
          elevation: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
        }}
      >
        <NutrationMol data={AllCategoryData[2]} />
      </View>
    </>
  );
};

export default NutritionTamplet;
