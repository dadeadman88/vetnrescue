import React, { useState } from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isStatesDropdownOpen, setIsStatesDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

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
    {
      id: 4,
      title: "Country",
      titleAr: "الدولة",
      image: IMAGES.lang,
      params: { title: "Country" },
    },
    {
      id: 5,
      title: "State",
      titleAr: "الولاية",
      image: IMAGES.lang,
      params: { title: "State" },
    }
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
          <View style={commonStyles.lineBar} />
        </View>
      );
    }
    else if(item.id === 4){
      return (
        <View style={{ position: 'relative' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {
            setIsDropdownOpen(!isDropdownOpen);
            if (!isDropdownOpen) {
              setIsStatesDropdownOpen(false);
            }
          }}>
            <View row marginV-20>
              <Image
                source={item.image}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
              <View marginL-20 flex>
                <View row spread>
                  <Typography size={theme.fontSize.medium} style={{flex: 1}}>
                    {displayTitle}
                  </Typography>
                  <Typography size={theme.fontSize.medium} style={{flex: 0.2}}>
                    {selectedCountry || null}
                  </Typography>
                  <Image
                    source={IMAGES.rightIcon}
                    style={{ 
                      width: 20, 
                      height: 25, 
                      resizeMode: 'contain',
                      transform: [{ rotate: isDropdownOpen ? '270deg' : '90deg' }] 
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.dropdownContainer}>
              <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCountry('UAE');
                    setIsDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>United Arab Emirates</Typography>
                </TouchableOpacity>
                <View style={commonStyles.lineBar} />
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCountry('KSA');
                    setIsDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>Saudi Arabia</Typography>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
          <View style={commonStyles.lineBar} />
        </View>
      );
    }
    else if(item.id === 5){
      return (
        <View style={{ position: 'relative' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {
            setIsStatesDropdownOpen(!isStatesDropdownOpen);
            if (!isStatesDropdownOpen) {
              setIsDropdownOpen(false);
            }
          }}>
            <View row marginV-20>
              <Image
                source={item.image}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
              <View marginL-20 flex>
                <View row spread>
                  <Typography size={theme.fontSize.medium} style={{flex: 1}}>
                    {displayTitle}
                  </Typography>
                  <Typography size={theme.fontSize.medium} style={{flex: 0.4}}>
                    {selectedState || null}
                  </Typography>
                  <Image
                    source={IMAGES.rightIcon}
                    style={{ 
                      width: 20, 
                      height: 25, 
                      resizeMode: 'contain',
                      transform: [{ rotate: isStatesDropdownOpen ? '270deg' : '90deg' }] 
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {isStatesDropdownOpen && (
            <View style={styles.dropdownContainer}>
              <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState('Dubai');
                    setIsStatesDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>Dubai</Typography>
                </TouchableOpacity>
                <View style={commonStyles.lineBar} />
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState('Abu Dhabi');
                    setIsStatesDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>Abu Dhabi</Typography>
                </TouchableOpacity>
                <View style={commonStyles.lineBar} />
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState('Riyadh');
                    setIsStatesDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>Riyadh</Typography>
                </TouchableOpacity>
                <View style={commonStyles.lineBar} />
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState('Jeddah');
                    setIsStatesDropdownOpen(false);
                  }}
                >
                  <Typography size={theme.fontSize.medium}>Jeddah</Typography>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
          <View style={commonStyles.lineBar} />
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
                  style={{  width: 20, 
                    height: 25, 
                    resizeMode: 'contain' }}
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

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    ...commonStyles.boxShadow,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default ProfileList;
