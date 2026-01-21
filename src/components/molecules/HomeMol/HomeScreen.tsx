import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Linking, FlatList, Platform, ScrollView } from "react-native";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { useDispatch, useSelector } from "react-redux";
import { States } from "../../../utils/types";
import { navigate } from "../../../navigation/RootNavigation";
import { setLanguage, setCountry, setState, setCity } from "../../../redux/slices/OtherSlice";
import { AppDispatch } from "../../../redux/store";
import Svg, { Path } from "react-native-svg";
import Swiper from "react-native-swiper";
import client from "../../../utils/AxiosInterceptor";
import { endpoints } from "../../../utils/Endpoints";
import { MainActions } from "../../../redux/actions/MainActions";

interface AdvertisementItem {
  id: string;
  image_url: string;
  external_link: string;
}

interface FlagCountryItem {
  id: string;
  name: string;
  code?: string;
  value: string;
  flag?: string;
  flagUrl?: string;
}

const flags = [
  {
    id: "1",
    name: "UAE",
    value: "UAE"
  },
  {
    id: "2",
    name: "KSA",
    value: "KSA"
  }
];

const FlagItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: FlagCountryItem;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity 
    style={[styles.flagItemContainer, isSelected && styles.flagItemContainerSelected]} 
    activeOpacity={0.8} 
    onPress={onPress}
  >
    <View style={styles.flagCircle}>
      <Typography size={theme.fontSize.extraLarge}>
        {item.flag}
      </Typography>
    </View>
    <Typography 
      size={theme.fontSize.small} 
      align="center"
      color={isSelected ? theme.color.white : "#9E9E9E"}
      style={styles.flagText}
    >
      {item.code || item.name}
    </Typography>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: States) => state.Others.language);
  const reduxCountry = useSelector((state: States) => state.Others.country);
  const countries = useSelector((state: States) => state.Main.Countries);
  const [advertisements, setAdvertisements] = useState<AdvertisementItem[]>([]);
  const [flagCountries, setFlagCountries] = useState<FlagCountryItem[]>([]);

  const HomeTabs = [
    {
      key: 0,
      title: "Vet Finder",
      titleAr: "البحث عن الطبيب البيطري",
      navigateTo: SCREENS.HEALTH_COACHING,
      image: require("../../../assets/images/petFinder.png"),
    },
    {
      key: 1,
      title: "Rescue Shelters",
      titleAr: "خدمات الإنقاذ",
      navigateTo: SCREENS.FITNESS_DETAIL,
      image: require("../../../assets/images/rescueIcon.png"),
    },
    {
      key: 2,
      title: "Contact for Advertisement",
      titleAr: "تواصل معنا للترويج",
      navigateTo: SCREENS.EDIT_PROFILE,
      image: require("../../../assets/images/promoIcon.png"),
    }
  ];

  // Load advertisements
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const adsResponse = await client.get(endpoints.GetAdvertisements());
        const adsData = adsResponse.data?.data || adsResponse.data?.response?.data || [];

        const mappedAds: AdvertisementItem[] = adsData.map((ad: any, index: number) => ({
          id: ad.id?.toString() || index.toString(),
          image_url: ad.image_url || "",
          external_link: ad.external_link || "",
        }));

        setAdvertisements(mappedAds);
      } catch (adsError) {
        console.error("Error fetching advertisements:", adsError);
        setAdvertisements([]);
      }
    };

    fetchAdvertisements();
  }, []);

  // Load countries if not already loaded
  useEffect(() => {
    if (!countries || !Array.isArray(countries) || countries.length === 0) {
      dispatch(MainActions.GetCountries());
    }
  }, [countries, dispatch]);

  // Map countries from API to flag items
  useEffect(() => {
    if (countries && Array.isArray(countries) && countries.length > 0) {
      const mappedCountries: FlagCountryItem[] = countries.map((country: any, index: number) => {
        const countryId = country.id?.toString();
        const countryName = country.name || country.title || country.label || country.country_name || String(country);
        
        return {
          id: countryId || country.code || country.value || String(index),
          name: countryName,
          code: country.code || undefined,
          value: countryId || country.code || country.value || String(country),
          flag: country.flag || undefined,
        };
      });

      setFlagCountries(mappedCountries);

      // Set UAE as default country if no country is selected
      if (!reduxCountry) {
        // Find UAE by id "1" or by code/name matching "UAE"
        const uaeCountry = countries.find((country: any) => {
          const countryId = country.id?.toString();
          const countryCode = country.code?.toUpperCase();
          const countryName = (country.name || country.title || '').toUpperCase();
          return countryId === '1' || countryCode === 'UAE' || countryName.includes('UNITED ARAB EMIRATES') || countryName.includes('UAE');
        });

        if (uaeCountry) {
          const uaeId = uaeCountry.id?.toString() || uaeCountry.code || uaeCountry.value || '1';
          dispatch(setCountry(uaeId));
        }
      }
    }
  }, [countries, reduxCountry, dispatch]);

  const handleSelectCountry = (item: FlagCountryItem) => {
    // Ensure we only store serializable values (string or null) in Redux
    const value = item.value ? String(item.value) : null;

    // Update Redux country
    dispatch(setCountry(value));

    // Clear state and city when country changes
    dispatch(setState(null));
    dispatch(setCity(null));
  };

  return (
      <View style={{ flex: 1, backgroundColor: "#FFF"}}>
          <View style={styles.headerWrapper}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigate(SCREENS.EDIT_PROFILE)}>
                <Image
                    source={IMAGES.promoIcon}
                    resizeMode="contain"
                   style={{ width: 80, height: 45, top: -3, left: -10 }}
                />
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
              </View>
              <TouchableOpacity 
                style={styles.langButton}
                activeOpacity={0.9}
                onPress={() => {
                  const newLanguage = language === 'en' ? 'ar' : 'en';
                  dispatch(setLanguage(newLanguage));
                }}>
                <Image
                    source={language === 'en' ? IMAGES.engToAr : IMAGES.arToEng}
                    resizeMode="contain"
                   style={{ width: 80, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

            <View style={styles.flagsContainer}>
              <Typography 
                size={theme.fontSize.large}  
                textType="bold"
                style={{ width: "100%", paddingHorizontal: 30, marginBottom: 12, fontWeight: "bold", textAlign: language === 'ar' ? 'right' : 'left' }}
              >
                {language === 'ar' ? 'اختر البلد' : 'Select Country'}
              </Typography>
              <FlatList
                data={flagCountries}
                renderItem={({ item }) => (
                  <FlagItem
                    item={item}
                    isSelected={reduxCountry === item.value}
                    onPress={() => handleSelectCountry(item)}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flagsList}
              />
            </View>  

            <View style={styles.mainButtonsContainer}>
              <TouchableOpacity 
                    onPress={() => navigate(SCREENS.FITNESS_DETAIL, { type: "vet" })}
                    style={[styles.buttonContainer, styles.vetCard]}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.imageContainer, styles.vetImageContainer]}>
                      <Image
                        source={HomeTabs[0].image}
                        style={styles.cardImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Typography color="#000000" size={theme.fontSize.medium} align="center" style={styles.cardText}>
                          {language === 'ar' ? HomeTabs[0].titleAr : HomeTabs[0].title}
                      </Typography>
                    </View>
                  </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => navigate(SCREENS.FITNESS_DETAIL, { type: "rescue" })}
                  style={[styles.buttonContainer, styles.rescueCard]}
                  activeOpacity={0.8}
                >
                  <View style={[styles.imageContainer, styles.rescueImageContainer]}>
                    <Image
                      source={HomeTabs[1].image}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Typography color="#000000" size={theme.fontSize.medium} align="center" style={styles.cardText}>
                        {language === 'ar' ? HomeTabs[1].titleAr : HomeTabs[1].title}
                    </Typography>
                  </View>
                </TouchableOpacity>
            </View>

            

          </ScrollView>

          <View style={styles.swiperContainer}>
              {advertisements.length > 0 && (
                <Swiper
                  showsButtons={false}
                  showsPagination={false}
                  loop={true}
                  autoplay={true}
                  autoplayTimeout={3}
                  style={styles.swiper}
                >
                  {advertisements.map((ad) => (
                    <TouchableOpacity
                      key={ad.id}
                      activeOpacity={0.8}
                      onPress={() => {
                        if (ad.external_link) {
                          client.post(endpoints.AdvertisementClick(ad.id)).catch((error) => {
                            console.error("Error tracking advertisement click:", error);
                          });
                          Linking.openURL(ad.external_link);
                        }
                      }}
                      style={styles.adSlide}
                    >
                      <Image
                        source={{ uri: ad.image_url }}
                        style={styles.adImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </Swiper>
              )}
            </View>

          {/*
          <View style={styles.bottomLinksContainer}>
            <TouchableOpacity onPress={() => navigate(SCREENS.PRIVACY)} activeOpacity={0.8} style={styles.bottomButton}>
              <Typography style={{fontWeight: "bold", lineHeight: 30}} color={theme.color.white} size={theme.fontSize.medium} align="center">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Privacy Policy'}
              </Typography>
            </TouchableOpacity>
          </View>
          */}

      </View>
  );
};

const styles = StyleSheet.create({ 
  headerWrapper: {
    width: "100%",
    paddingTop: 30
  },
  headerRow: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    width: "90%",
    height: 70,
    left: -10
  },
  flagsContainer: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  flagsList: {
    paddingHorizontal: 30,
    gap: 10,
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 10
  },
  flagItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 12,
    borderRadius: 40,
    backgroundColor: theme.color.white,
    borderWidth: 1.5,
    borderColor: "#E5E5E5"
  },
  flagItemContainerSelected: {
    backgroundColor: "#4BB329",
    borderColor: "#4BB329",
  },
  flagCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  flagImage: {
    width: "100%",
    height: "100%",
  },
  flagText: {
    textTransform: "uppercase",
    fontWeight: "500",
  },
  swiperContainer: {
    width: "100%",
    height: Dimensions.get('window').height * 0.232, // 25vh equivalent
    paddingVertical: 20,
    marginBottom: 30
  },
  swiper: {

  },
  adSlide: {
    flex: 1,
    marginHorizontal: 20
  },
  adImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.primary
  },
  buttonContainer: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
    height: Dimensions.get('window').height * 0.25
  },
  vetCard: {
    borderWidth: 1,
    borderColor: "#B8E6B8"
  },
  rescueCard: {
    borderWidth: 1,
    borderColor: "#B8E6B8",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 10
  },
  vetImageContainer: {
    backgroundColor: "#FFE5E5",
  },
  rescueImageContainer: {
    backgroundColor: "#E5F3FF",
  },
  cardImage: {
    width: "60%"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
  cardText: {
    fontWeight: "bold",
  },
  langButton: {
    alignItems: "flex-end",
  },
  mainButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 10
  },
  bottomLinksContainer: {
    width: "100%",
    marginBottom: Platform.OS === 'android' ? 50 : 20
  },
  bottomButton: {
    width: "100%",
    backgroundColor: theme.color.primary,
    paddingVertical:15,
  }
});

export default HomeScreen;
