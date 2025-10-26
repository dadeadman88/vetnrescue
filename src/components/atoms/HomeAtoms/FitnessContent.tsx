import React from "react";
import { View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import ContentComp from "../GlobalComponents/ContentComp";

const FitnessContent = () => {
  return (
    <View>
      <ContentComp
        title="Why choose an Elite Personal Trainer?"
        content="An Elite Personal Trainer is a top-tier fitness professional known for their expertise, experience, and dedication to helping clients achieve their fitness goals. What sets them apart from other trainers are several key differentiators:"
      />
    </View>
  );
};

export default FitnessContent;
