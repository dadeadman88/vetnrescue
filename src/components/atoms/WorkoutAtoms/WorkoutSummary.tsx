import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Typography } from "../Typography";
import { theme } from "../../../constants";
import { useRoute } from "@react-navigation/native";

const WorkoutSummary = (props: any) => {

  const { params } = useRoute();

  const getTime = () => {
    let total_secs = params?.data?.totalSeconds;
    let secs = total_secs % 60
    let minutes = total_secs / 60
    return (minutes < 10 ? "0" + Math.floor(minutes) : Math.floor(minutes)) + ":" + (secs < 10 ? "0" + Math.floor(secs) : Math.floor(secs))
  }
  const DATA = [
    { id: 1, title: "Total time", subTitle: getTime() },
    { id: 2, title: "Total Sets", subTitle: params?.data?.sets },
  ];

  const _renderItem = ({ item }: any) => (
    <View
      style={styles.itemContainer}
    >
      <Typography textType="semiBold" size={theme.fontSize.medium}>
        {item.title}
      </Typography>

      <Typography color={theme.color.primary} size={theme.fontSize.medium}>
        {item.subTitle}
      </Typography>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F9FE",

  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default WorkoutSummary;
