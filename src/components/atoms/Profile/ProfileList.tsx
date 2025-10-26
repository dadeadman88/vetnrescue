import React from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { commonStyles } from "../../../globalStyle";
import { navigate, reset } from "../../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { States } from "../../../utils/types";
import { setLanguage } from "../../../redux/slices/OtherSlice";

const ProfileList = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: States) => state.Others.language);

  const DATA = [
    {
      id: 1,
      title: "Privacy Policy",
      titleAr: "سياسة الخصوصية",
      image: IMAGES.reportPet,
      navigateTo: SCREENS.PRIVACY,
      params: { title: "Privacy Policy" },
    },
    {
      id: 2,
      title: "Terms and Conditions",
      titleAr: "الشروط والأحكام",
      image: IMAGES.reportPet,
      navigateTo: SCREENS.PRIVACY,
      params: { title: "Terms and Conditions" },
    },
    {
      id: 3,
      title: "Language",
      titleAr: "اللغة",
      image: IMAGES.lang,
      params: { title: "Language" },
    },
  ];

  const _renderItem = ({ item }: any) => {
    const displayTitle = language === 'ar' ? (item.titleAr || item.title) : item.title;
    
    if(item.id === 3){
      return (
        <View>
          <View row marginV-20>
            <Image
                source={item.image}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            <View marginL-20 flex>
              <View row spread>
                <Typography size={theme.fontSize.medium}>{displayTitle}</Typography>
                <TouchableOpacity 
                  activeOpacity={0.9} 
                  onPress={() => {
                    const newLanguage = language === 'en' ? 'ar' : 'en';
                    dispatch(setLanguage(newLanguage));
                    setTimeout(() => {
                      navigate(SCREENS.ONBOARDING);
                      setTimeout(() => {
                        reset(SCREENS.HOME);
                      }, 2000);
                    }, 100);
                  }}
                >
                  <Image
                    source={language === 'en' ? IMAGES.engToAr : IMAGES.arToEng}
                    resizeMode="contain"
                    style={{ width: 100, height: 25 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
    else {
      return (
        <TouchableOpacity onPress={() => navigate(item.navigateTo, item.params)}>
          <View row marginV-20>
            <Image
              source={item.image}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <View marginL-20 flex>
              <View row spread>
                <Typography size={theme.fontSize.medium}>{displayTitle}</Typography>
                <Image
                  source={IMAGES.rightIcon}
                  style={{ width: 15, height: 15 }}
                />
              </View>
            </View>
          </View>
          <View style={commonStyles.lineBar} />
        </TouchableOpacity>
      );
    }
  
  };

  return (
    <FlatList
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProfileList;
