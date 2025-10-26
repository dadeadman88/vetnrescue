import React from "react";
import { View } from "react-native";
import CategoriesComp from "../../atoms/GlobalComponents/CategoriesComp";
import HomeDetailMol from "../../molecules/HomeMol/HomeDetailMol";
import ContentComp from "../../atoms/GlobalComponents/ContentComp";
import { SCREENS } from "../../../constants";

const FitnessOrg = () => {
  const goals = [
    { id: 1, title: "Video Demonstrations" },
    { id: 2, title: "Written Instructions" },
    { id: 3, title: "Difficulty Levels and Modifications" },
    { id: 4, title: "Muscle Group Focus" },
    { id: 5, title: "Equipment Needed" },
  ];

  const goalsDetails = [
    { id: 1, title: "Health Coaching Packages and Pricing",navigateTo:SCREENS.GOAL_DETAILS },
    { id: 2, title: "Available Health Coaching Packages",navigateTo:SCREENS.GOAL_DETAILS },
    { id: 3, title: "Other Health Coaching Packages",navigateTo:SCREENS.GOAL_DETAILS },
  ];

  return (
    <View>
     <ContentComp
        title="Why choose an Elite Personal Trainer?"
        content="An Elite Personal Trainer is a top-tier fitness professional known for their expertise, experience, and dedication to helping clients achieve their fitness goals. What sets them apart from other trainers are several key differentiators:"
      />
      <CategoriesComp
        goals={goals}
        goalsDetails={goalsDetails}
        showFitnessContent={true}
        showGoalsDetails={false}
      />
    </View>
  );
};

export default FitnessOrg;
