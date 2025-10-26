import React from "react";
import { Typography } from "../../atoms/Typography";
import HomeDetailBottomContent from "../../atoms/HomeAtoms/HomeDetailBottomContent";
import HealthItem from "../../atoms/HomeAtoms/HealthItem";
import ContentComp from "../../atoms/GlobalComponents/ContentComp";

const content = [
  { id: 1, title: "Health Coaching Packages and Pricing" },
  { id: 2, title: "Available Health Coaching Packages" },
  { id: 3, title: "Other Health Coaching Packages" },
];

const HomeDetailMol = ({ data }) => {
  return (
    <>
      <ContentComp
        title={data?.title}
        content={data?.description}
      />
      <Typography textType={"semiBold"}>Categories:</Typography>
      <HealthItem data={data?.sub_categories} content={content} />
    </>
  );
};

export default HomeDetailMol;
