import React from "react";
import { View } from "react-native";
import CategoriesComp from "../../atoms/GlobalComponents/CategoriesComp";
import HomeDetailMol from "../../molecules/HomeMol/HomeDetailMol";
import { navigate } from "../../../navigation/RootNavigation";
import { SCREENS } from "../../../constants";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HealthCoachingOrg = () => {
  


  return (
    <View>
      <HomeDetailMol />
    </View>
  );
};

export default HealthCoachingOrg;
