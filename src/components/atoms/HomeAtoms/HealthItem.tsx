import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Typography } from "../Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Image, View } from "react-native-ui-lib";
import CategoriesComp from "../GlobalComponents/CategoriesComp";
import { navigate } from "../../../navigation/RootNavigation";





const HealthItem = ({ data,content }: any) => {
  const [selected, setSelectedId] = useState(data[0])

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => setSelectedId(item)}
            style={{
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 10,
              backgroundColor:
                selected?.id === item.id
                  ? theme.color.primarybeta
                  : theme.color.secondry,
            }}
          >
            <Typography
              size={theme.fontSize.extraSmall12}
              color={
                selected?.id === item.id ? theme.color.white : theme.color.black
              }
            >
              {item.title}
            </Typography>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <CategoriesComp goals={selected?.content_list} />

      {/* {content.map((detail) => (
        <TouchableOpacity
          key={detail.id}
          onPress={() => navigate(SCREENS.GOAL_DETAILS)}
        >
          <View
            spread
            row
            marginV-10
            padding-15
            backgroundColor={theme.color.inputTypeColor}
          >
            <Typography size={theme.fontSize.small}>
              {detail.title}
            </Typography>
            <Image
              source={IMAGES.rightIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ))} */}

    </View>
  );
};
export default HealthItem;
