import React, { useState } from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, theme } from "../../../constants";
import { commonStyles } from "../../../globalStyle";
import { scale, verticalScale } from "react-native-size-matters";

const VerticalItem = (props: any) => {
  const { onPress, data } = props;

  const _renderItem = ({ item, index }: any) => {
    return (
      <>
        <TouchableOpacity onPress={() => onPress(item, index)}>
          <View row marginV-20>
            <Image
              source={{ uri: item?.image_urls ? item?.image_urls : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" }}
              style={{ width: scale(80), height: verticalScale(50), borderRadius: 10 }}
              resizeMode="cover"
            />
            <View marginL-20 flex>
              <Typography textType={"semiBold"}>{item.title}</Typography>
              <View row >
                <View row center>
                  <Image
                    source={IMAGES.calories}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                  <Typography style={{ marginLeft: 10 }}>{item?.work_calories} kcal</Typography>
                </View>
                <View style={{ height: 15, borderWidth: 1, marginHorizontal: 15, borderColor: '#707070', alignSelf: "center" }} />
                <View row center>
                  <Image
                    source={IMAGES.clock}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                  <Typography style={{ marginLeft: 10 }}>{item?.work_time} min</Typography>
                </View>
              </View>
              <Typography size={theme.fontSize.extraSmall12}>{item?.work_level}</Typography>
            </View>
          </View>
          <View style={commonStyles.lineBar} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default VerticalItem;
