import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { useDispatch, useSelector } from "react-redux";
import { States } from "../../utils/types";
import { setLanguage } from "../../redux/slices/OtherSlice";
import { navigate, reset } from "../../navigation/RootNavigation";
import { commonStyles } from "../../globalStyle";

const Exercise = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: States) => state.Others.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isStatesDropdownOpen, setIsStatesDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerRow}>
            <View style={styles.logoContainer}>
              <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
          {/* Language Option */}
          <View style={{ width: "100%" }}>
            <View row marginV-20>
              <Image
                source={IMAGES.lang}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
              <View marginL-20 flex>
                <View row spread>
                  <Typography size={theme.fontSize.medium}>
                    {language === 'ar' ? 'اللغة' : 'Language'}
                  </Typography>
                  <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={() => {
                      const newLanguage = language === 'en' ? 'ar' : 'en';
                      dispatch(setLanguage(newLanguage));
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

          {/* Country Option */}
          <View style={{ width: "100%", position: 'relative' }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (!isDropdownOpen) {
                setIsStatesDropdownOpen(false);
              }
            }}>
              <View row marginV-20>
                <Image
                  source={IMAGES.lang}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
                <View marginL-20 flex>
                  <View row spread>
                    <Typography size={theme.fontSize.medium} style={{flex: 1}}>
                      {language === 'ar' ? 'الدولة' : 'Country'}
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

          {/* States Option */}
          <View style={{ width: "100%", position: 'relative' }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
              setIsStatesDropdownOpen(!isStatesDropdownOpen);
              if (!isStatesDropdownOpen) {
                setIsDropdownOpen(false);
              }
            }}>
              <View row marginV-20>
                <Image
                  source={IMAGES.lang}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
                <View marginL-20 flex>
                  <View row spread>
                    <Typography size={theme.fontSize.medium} style={{flex: 1}}>
                      {language === 'ar' ? 'الولاية' : 'State'}
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
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
          <TouchableOpacity 
            style={styles.circularButton}
            onPress={() => reset(SCREENS.HOME)}
            activeOpacity={0.8}
          >
            <Typography textType="bold" color={theme.color.white} size={theme.fontSize.large}>
              Continue
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%"
  },
  headerRow: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50
  },
  logoImage: {
    width: "50%",
    height: 70,
  },
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
  circularButton: {
    borderRadius: 30,
    backgroundColor: theme.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
});

export default Exercise;
