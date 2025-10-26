import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import ProfileData from "../../components/molecules/ProfileMOl/ProfileData";
import EditProfileData from "../../components/molecules/ProfileMOl/EditProfileData";
import { useSelector } from "react-redux";
import { States } from "../../utils/types";

const EditProfile = () => {
  const language = useSelector((state: States) => state.Others.language);
  
  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 marginV-10>
        <DrawerTitle title={language === 'ar' ? "الإبلاغ عن حيوان ضال" : "Report Stray Animal"} />
      </View>
      <EditProfileData />
      
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
