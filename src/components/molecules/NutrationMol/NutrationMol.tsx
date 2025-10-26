import React from "react";
import { Typography } from "../../atoms/Typography";
import HealthItem from "../../atoms/HomeAtoms/HealthItem";
import ContentComp from "../../atoms/GlobalComponents/ContentComp";
import { View } from "react-native-ui-lib";

const content = [
  { id: 1, title: "Nutrition Coaching Packages and Pricing" },
  { id: 2, title: "Considering Follow-Up Sessions?" },
  { id: 3, title: "Follow-Up Session Details" },
];

const NutrationMol = ({ data }) => {
  return (
    <View>
      <View paddingH-20>
        <ContentComp
          title={data?.title}
          content={data?.description}
        />
      </View>
      <Typography textType={"semiBold"}>Categories:</Typography>
      <HealthItem data={data?.sub_categories} content={content} />
    </View>
  );
};

export default NutrationMol;
