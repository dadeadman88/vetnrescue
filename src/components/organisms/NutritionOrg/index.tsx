import React from "react";
import { View } from "react-native";
import CategoriesComp from "../../atoms/GlobalComponents/CategoriesComp";
import NutrationMol from "../../molecules/NutrationMol/NutrationMol";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Image, TouchableOpacity, Typography } from "react-native-ui-lib";
import { navigate } from "../../../navigation/RootNavigation";
import { useSelector } from "react-redux";

const NutritionOrg = () => {
  const goals = [
    { id: 1, title: "Barcode Scanner for Easy Logging" },
    { id: 2, title: "Macro and Micro Nutrient Breakdown" },
    { id: 3, title: "Meal Timing and Portion Sizes" },
    { id: 4, title: "Integration with Fitness Goals" },
    { id: 5, title: "Food Log History and Trends" },
  ];

 



  return (
    <View>
    </View>
  );
};

export default NutritionOrg;
