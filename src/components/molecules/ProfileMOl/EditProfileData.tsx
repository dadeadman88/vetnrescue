import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../globalStyle";
import ProfileImg from "../../atoms/Profile/ProfileImg";
import { onBack } from "../../../navigation/RootNavigation";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { InputText } from "../../atoms/InputText";
import { useSelector } from "react-redux";
import { States } from "../../../utils/types";

const EditProfileData = () => {
  const language = useSelector((state: States) => state.Others.language);
  const isRTL = language === 'ar';
  const [animalType, setAnimalType] = useState("");
  const [animalBreed, setAnimalBreed] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={commonStyles.footerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.8}><ProfileImg image="https://sugarplumnannies.com/wp-content/uploads/2015/11/dog-placeholder.jpg" /></TouchableOpacity>
        <InputText
          value={animalType}
          placeholder={language === 'ar' ? "نوع الحيوان" : "Animal Type"}
          onChangeText={(text: string) => setAnimalType(text)}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        <InputText
          value={animalBreed}
          placeholder={language === 'ar' ? "سلالة الحيوان" : "Animal Breed"}
          style={{ marginTop: -10, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setAnimalBreed(text)}
        />
        <InputText
          value={description}
          placeholder={language === 'ar' ? "الوصف" : "Description"}
          multiline={true}
          style={{ marginTop: -10, height: 150, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setDescription(text)}
        />

        <View marginV-40>
          <CustomBtn label={language === 'ar' ? "إرسال" : "Submit"} onPress={() => onBack()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileData;
