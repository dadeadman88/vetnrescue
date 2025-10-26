import React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import { ScrollView } from "react-native";
import HealthCoachingTamplet from "../../components/templates/HealthCoachingTamplet";
import NutritionTamplet from "../../components/templates/NutritionTamplet";

const NutrtionDetail = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      {/* <HeaderHome color={"#fff"} headerBkColor={"rgba(0,0,0,0.8)"}/> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ top: -10,backgroundColor:"#fff" }}>
        <NutritionTamplet />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default NutrtionDetail;
