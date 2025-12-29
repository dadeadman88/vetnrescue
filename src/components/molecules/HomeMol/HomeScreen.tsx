import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Linking, FlatList } from "react-native";
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
  flagUrl?: string;
}

const flags = [
  {
    id: "1",
    name: "UAE",
    value: "UAE",
    flagUrl: "data:image/png;base64,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",
  },
  {
    id: "2",
    name: "KSA",
    value: "KSA",
    flagUrl: "data:image/png;base64,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"
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
      {item.flagUrl ? (
        <Image
          source={{ uri: item.flagUrl }}
          style={styles.flagImage}
          resizeMode="cover"
        />
      ) : (
        <Typography color={theme.color.white} size={theme.fontSize.large}>
          {item.name?.charAt(0) ?? "?"}
        </Typography>
      )}
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
        const adsResponse = await client.get(endpoints.GetAdvertisements);
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

  // Map countries from API to flag items, using flag images from flags constant
  useEffect(() => {
    if (countries && Array.isArray(countries) && countries.length > 0) {
      const mappedCountries: FlagCountryItem[] = countries.map((country: any, index: number) => {
        const countryId = country.id?.toString();
        const countryName = country.name || country.title || country.label || country.country_name || String(country);
        
        // Find matching flag from flags constant by ID
        const matchingFlag = flags.find(
          (flag) => flag.id === countryId
        );
        
        return {
          id: countryId || country.code || country.value || String(index),
          name: countryName,
          code: country.code || undefined,
          value: countryId || country.code || country.value || String(country),
          flagUrl: matchingFlag?.flagUrl || undefined,
        };
      });

      setFlagCountries(mappedCountries);
    }
  }, [countries]);

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

          <View style={styles.flagsContainer}>
            <Typography 
              size={theme.fontSize.large} 
              style={styles.selectCountryHeading}
              textType="bold"
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
                    <Typography color="#000000" size={theme.fontSize.large} align="center" style={styles.cardText}>
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
                  <Typography color="#000000" size={theme.fontSize.large} align="center" style={styles.cardText}>
                      {language === 'ar' ? HomeTabs[1].titleAr : HomeTabs[1].title}
                  </Typography>
                </View>
              </TouchableOpacity>
          </View>

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

         <View style={styles.bottomLinksContainer}>
          <TouchableOpacity onPress={() => navigate(SCREENS.PRIVACY)} activeOpacity={0.8} style={styles.bottomButton}>
            <Typography color={theme.color.white} size={theme.fontSize.large} align="center">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Privacy Policy'}
            </Typography>
          </TouchableOpacity>
         </View>

      </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    paddingTop: 50
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
  selectCountryHeading: {
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 12,
    textAlign: "left",
    fontWeight: "bold"
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
    paddingVertical: 20
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
    paddingVertical: 20
  },
  bottomLinksContainer: {
    width: "100%",
    justifyContent: "flex-end",
    flex:1
  },
  bottomButton: {
    width: "100%",
    backgroundColor: theme.color.primary,
    paddingTop:15,
    paddingBottom: 20
  }
});

export default HomeScreen;
