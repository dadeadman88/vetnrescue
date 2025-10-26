import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import ProfileData from "../../components/molecules/ProfileMOl/ProfileData";
import { useSelector } from "react-redux";
import { States } from "../../utils/types";

const Profile = () => {
  const language = useSelector((state: States) => state.Others.language);
  
  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 marginV-20>
        {/* <DrawerTitle title={"My Profile"} /> */}
      </View>
      <ProfileData />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Profile;
