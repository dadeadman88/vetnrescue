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
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={commonStyles.footerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputText
          value={animalType}
          placeholder={language === 'ar' ? "الاسم الأول" : "First Name"}
          onChangeText={(text: string) => setAnimalType(text)}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        <InputText
          value={animalBreed}
          placeholder={language === 'ar' ? "اسم العائلة" : "Last Name"}
          style={{ marginTop: -10, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setAnimalBreed(text)}
        />
        <InputText
          value={phoneNumber}
          placeholder={language === 'ar' ? "رقم الهاتف" : "Phone Number"}
          style={{ marginTop: -10, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <InputText
          value={description}
          placeholder={language === 'ar' ? "رسالة" : "Message"}
          multiline={true}
          style={{
            paddingTop: 10,
            marginTop: -10,
            height: 150,
            textAlign: isRTL ? 'right' : 'left',
            textAlignVertical: 'top',
          }}
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
