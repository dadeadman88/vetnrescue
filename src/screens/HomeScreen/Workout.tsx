import React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import WorkOutTamplet from "../../components/templates/WorkOutTamplet";
import { ScrollView } from "react-native";

const Workout = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <ScrollView style={{ backgroundColor: "#ffff" }}>
        <WorkOutTamplet />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Workout;
