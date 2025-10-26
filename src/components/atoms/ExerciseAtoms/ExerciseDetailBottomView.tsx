import React, { useState } from "react";
import { Image } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, theme } from "../../../constants";

const ExerciseDetailBottomView = ({ data }) => {

  return (
    <>
      <View row center marginV-20>
        <View row center>
          <Image
            source={IMAGES.calories}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          />
          <Typography style={{ marginLeft: 10 }}>{data?.work_calories} kcal</Typography>
        </View>
        <View
          style={{
            height: 15,
            borderWidth: 1,
            marginHorizontal: 15,
            borderColor: "#707070",
            alignSelf: "center",
          }}
        />
        <View row center>
          <Image
            source={IMAGES.clock}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          />
          <Typography style={{ marginLeft: 10 }}>{data?.work_time} min</Typography>
        </View>
      </View>
      <View row center gap-30>
        <View center flex>
          <Typography>{"Level"}</Typography>
          <View marginV-10
            style={{

              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: theme.color.inputTypeColor,
            }}
          >
            <Typography textType="semiBold" size={theme.fontSize.extraSmall}>{data?.work_level}</Typography>
          </View>
        </View>
        <View center flex>
          <Typography>{"Category"}</Typography>
          <View marginV-10
            style={{

              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: theme.color.inputTypeColor,
            }}
          >
            <Typography textType="semiBold" size={theme.fontSize.extraSmall}>{data?.parent_category?.title}</Typography>
          </View>
        </View>
        <View center flex>
          <Typography>{"Weight"}</Typography>
          <View marginV-10
            style={{

              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: theme.color.inputTypeColor,
            }}
          >
            <Typography textType="semiBold" size={theme.fontSize.extraSmall}>{data?.work_type}</Typography>
          </View>
        </View>
      </View>
    </>
  );
};
export default ExerciseDetailBottomView;
