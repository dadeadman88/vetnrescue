import React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import ExerciseDetailMol from "../../components/molecules/ExerciseMol/ExerciseDetailMol";
import { ScrollView } from "react-native";

const ExerciseDetail = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <ScrollView showsVerticalScrollIndicator={false} style={{top: -10}}> 
      <ExerciseDetailMol />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default ExerciseDetail;
