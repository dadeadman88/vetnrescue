import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Typography } from "../Typography";
import { theme } from "../../../constants";

const HorizentalItem = ({ data = [], onSelect = (index: number) => { } }) => {
  const [selectedId, setSelectedId] = useState(0)

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedId(index)
            onSelect(index)
          }}
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            margin: 10,
            backgroundColor:
              selectedId === index
                ? theme.color.primarybeta
                : theme.color.secondry,
          }}
        >
          <Typography
            textType="semiBold"
            size={theme.fontSize.extraSmall12}
            color={
              selectedId === index ? theme.color.white : theme.color.black
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
  );
};
export default HorizentalItem;
