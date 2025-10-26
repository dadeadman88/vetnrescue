import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../globalStyle";
import ProfileImg from "../../atoms/Profile/ProfileImg";
import ProfileList from "../../atoms/Profile/ProfileList";
import { useSelector } from "react-redux";
import { States } from "../../../utils/types";

const ProfileData = () => {
  const { user } = useSelector((state: States) => state.Auth);
  console.warn(user)
  return (
    <View style={commonStyles.footerContainer}>
      <ProfileList />
    </View>
  );
};


export default ProfileData;
