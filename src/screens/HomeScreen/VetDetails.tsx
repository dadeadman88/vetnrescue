import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View as RNView,
  Text,
  FlatList,
  Linking,
  RefreshControl,
  Dimensions,
  Animated,
} from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme, SCREENS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { States } from "../../utils/types";
import Swiper from "react-native-swiper";
import { setLoading } from "../../redux/slices/OtherSlice";
import client from "../../utils/AxiosInterceptor";
import { endpoints } from "../../utils/Endpoints";

const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M19 19L13.65 13.65M15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5Z"
      stroke="#7C8BA0"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DocumentReportIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20M12 14V16M12 12V16M12 18V16"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface FacilityItem {
  id: string;
  name: string;
  name_ar?: string;
  address: string;
  address_ar?: string;
  phone: string;
  description?: string;
  description_ar?: string;
  image_url?: string;
  google_maps_link?: string;
}

const FALLBACK_CLINIC_IMAGE = "https://www.carecredit.com/sites/cc/image/vet_clinic_vs_animal_hospital.jpg";

const ClinicCard = ({ item, language }: { item: FacilityItem; language: "en" | "ar" }) => {
  const handleCall = () => {
    if (item.phone) {
      const phoneNumber = item.phone.replace(/[^\d+]/g, "");
      const telUrl = `tel:${phoneNumber}`;
      Linking.openURL(telUrl).catch((err) => {
        console.error("Error opening phone dialer:", err);
      });
    }
  };

  const handleDirections = () => {
    if (item.google_maps_link) {
      Linking.openURL(item.google_maps_link).catch((err) => {
        console.error("Error opening Google Maps:", err);
      });
    }
  };

  const imageSource = { uri: item.image_url || FALLBACK_CLINIC_IMAGE };

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <View style={[styles.cardHeader, { flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
          <Text style={[styles.clinicName, { textAlign: language === "ar" ? "right" : "left" }]}>
            {language === "ar" && item.name_ar ? item.name_ar : item.name}
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.locationIconButton} onPress={handleDirections}>
              <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require("../../assets/images/mapIcon.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.phoneIconButton} onPress={handleCall}>
              <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require("../../assets/images/callIcon.png")} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoRow, { marginLeft: -3, flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
          <Image
            style={{
              width: 18,
              height: 18,
              marginRight: language === "ar" ? -2 : 0,
              marginLeft: language === "ar" ? 2 : 0,
              marginTop: language === "ar" ? 10 : 0,
            }}
            resizeMode="contain"
            source={require("../../assets/images/location-icon-small.png")}
          />
          <Text style={styles.infoText}>{language === "ar" && item.address_ar ? item.address_ar : item.address}</Text>
        </View>

        <View style={[styles.infoRow, { flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
          <Image
            style={{ width: 15, height: 20, marginRight: language === "ar" ? 0 : 8, marginLeft: language === "ar" ? 8 : 0 }}
            resizeMode="contain"
            source={require("../../assets/images/call-icon-small.png")}
          />
          <Text style={styles.infoText}>{item.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const ReportPetCard = ({ language }: { language: "en" | "ar" }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.reportPetContainer}>
      <Text style={styles.reportPetHeading}>{language === "ar" ? "وجدت حيوانًا ضالاً؟" : "Found a stray animal?"}</Text>
      <Text style={styles.reportPetDescription}>
        {language === "ar"
          ? "أبلغ عنه الآن وسنساعدك في العثور على أقرب مركز إنقاذ"
          : "Report it now and we'll help you find the nearest rescue center"}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ADVERTISEMENT_FORM)} style={styles.reportPetButton}>
        <DocumentReportIcon />
        <Text style={styles.reportPetButtonText}>{language === "ar" ? "الإبلاغ عن حيوان ضال" : "Report Stray Animal"}</Text>
      </TouchableOpacity>
    </View>
  );
};

interface AdvertisementItem {
  id: string;
  image_url: string;
  external_link: string;
}

const VetDetails = () => {
  const lastOffsetY = useRef(0);
  const isDragging = useRef(false);
  const lastAction = useRef<"up" | "down" | null>(null);
  const searchOpacity = useRef(new Animated.Value(1)).current;
  const searchHeight = useRef(new Animated.Value(55)).current;

  const onScroll = (event: any) => {
    if (!isDragging.current) return;

    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < 100) {
      lastAction.current = null;
      lastOffsetY.current = offsetY;
      Animated.timing(searchHeight, { toValue: 55, duration: 200, useNativeDriver: false }).start();
      Animated.timing(searchOpacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      return;
    }

    if (offsetY > lastOffsetY.current && lastAction.current !== "down") {
      lastAction.current = "down";
      Animated.timing(searchHeight, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      Animated.timing(searchOpacity, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }

    if (offsetY < lastOffsetY.current && lastAction.current !== "up") {
      lastAction.current = "up";
      Animated.timing(searchOpacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      Animated.timing(searchHeight, { toValue: 55, duration: 200, useNativeDriver: false }).start();
    }

    lastOffsetY.current = offsetY;
  };

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [initialFacilities, setInitialFacilities] = useState<FacilityItem[]>([]);
  const [advertisements, setAdvertisements] = useState<AdvertisementItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const language = useSelector((state: States) => state.Others.language);
  const cityId = useSelector((state: States) => state.Others.city);
  const countryId = useSelector((state: States) => state.Others.country);
  const isRTL = language === "ar";
  const requestType: "vet" | "rescue" = route?.params?.type ?? "rescue";

  const searchPlaceholder =
    requestType === "vet"
      ? language === "ar"
        ? "البحث عن العيادات البيطرية..."
        : "Search for vet clinics..."
      : language === "ar"
        ? "البحث عن مراكز الإنقاذ..."
        : "Search for rescue shelters...";

  const fetchData = async (showLoading: boolean = true) => {
    try {
      if (showLoading) dispatch(setLoading(true));

      const endpoint = requestType === "vet" ? endpoints.GetVetClinics(cityId, countryId) : endpoints.GetRescueShelters(cityId, countryId);
      const facilitiesResponse = await client.get(endpoint);
      const facilitiesData = facilitiesResponse.data?.data || facilitiesResponse.data?.response?.data || [];

      const mappedFacilities: FacilityItem[] = facilitiesData.map((facility: any, index: number) => ({
        id: facility.id?.toString() || index.toString(),
        name: facility.name || facility.localized_name || "",
        name_ar: facility.name_ar || "",
        address: facility.address || facility.localized_address || "",
        address_ar: facility.address_ar || "",
        phone: facility.phone || "",
        description: facility.description || "",
        description_ar: facility.description_ar || "",
        image_url: facility.image_url || facility.image || "",
        google_maps_link: facility.google_maps_link || "",
      }));

      setFacilities(mappedFacilities);
      setInitialFacilities(mappedFacilities);

      try {
        const adsResponse = await client.get(endpoints.GetAdvertisements(countryId));
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
    } catch (error) {
      console.error("Error fetching facilities:", error);
      setFacilities([]);
      setInitialFacilities([]);
    } finally {
      if (showLoading) dispatch(setLoading(false));
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestType, cityId, countryId, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(false);
  };

  useEffect(() => {
    const searchFacilities = async () => {
      if (!searchText || searchText.trim().length < 3) {
        setFacilities(initialFacilities);
        return;
      }

      try {
        dispatch(setLoading(true));
        const searchResponse = await client.get(endpoints.SearchFacilities(searchText.trim(), cityId, countryId));
        const searchData = searchResponse.data?.data || searchResponse.data?.response?.data || [];

        const mappedSearchResults: FacilityItem[] = searchData.map((facility: any, index: number) => ({
          id: facility.id?.toString() || index.toString(),
          name: facility.name || facility.localized_name || "",
          name_ar: facility.name_ar || "",
          address: facility.address || facility.localized_address || "",
          address_ar: facility.address_ar || "",
          phone: facility.phone || "",
          description: facility.description || "",
          description_ar: facility.description_ar || "",
          image_url: facility.image_url || facility.image || "",
          google_maps_link: facility.google_maps_link || "",
        }));

        setFacilities(mappedSearchResults);
      } catch (error) {
        console.error("Error searching facilities:", error);
        setFacilities([]);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timeoutId = setTimeout(() => {
      searchFacilities();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, initialFacilities, cityId, countryId, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMAGES.backButton} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <TouchableOpacity style={[styles.notificationButton, { opacity: 0 }]}>
            <Image source={IMAGES.settings} style={styles.notificationImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.searchWrapper, { opacity: searchOpacity, height: searchHeight }]}>
          <View style={[styles.searchContainer, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
            <RNView style={[styles.searchIcon, { marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }]}>
              <SearchIcon />
            </RNView>
            <TextInput
              style={[styles.searchInput, { textAlign: isRTL ? "right" : "left" }]}
              placeholder={searchPlaceholder}
              placeholderTextColor={theme.color.tgray}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate(SCREENS.SEARCH_LOCATIONS)}>
              <Image source={IMAGES.filterLocation} style={styles.notificationImage} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      <FlatList
        data={facilities}
        renderItem={({ item }) => <ClinicCard item={item} language={language} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          isDragging.current = true;
        }}
        onScrollEndDrag={() => {
          isDragging.current = false;
        }}
        scrollEventThrottle={16}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.color.primary || "#47a2ab"}
            colors={[theme.color.primary || "#47a2ab"]}
          />
        }
        // ListHeaderComponent={<ReportPetCard language={language} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { textAlign: isRTL ? "right" : "left" }]}>
              {language === "ar" ? "لا توجد نتائج" : "No results"}
            </Text>
          </View>
        }
      />

      {!isSearchFocused && (
        <View style={styles.swiperContainer}>
          {advertisements.length > 0 && (
            <Swiper showsButtons={false} showsPagination={false} loop={true} autoplay={true} autoplayTimeout={3} style={styles.swiper}>
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
                  <Image source={{ uri: ad.image_url }} style={styles.adImage} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </Swiper>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  headerWrapper: {
    width: "100%",
  },
  headerRow: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "60%",
    height: 60,
  },
  notificationButton: {
    alignItems: "flex-end",
  },
  notificationImage: {
    width: 25,
    height: 25,
    tintColor: "#47a2ab",
  },
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
    height: 55,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.color.black,
    fontFamily: theme.font.regular,
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4BB329",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "96%",
    height: 170,
    margin: "2%",
    borderRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  clinicName: {
    flex: 1,
    fontSize: 18,
    fontFamily: theme.font.bold,
    color: theme.color.black,
    marginRight: 8,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationIconButton: {
    padding: 4,
  },
  phoneIconButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4BB329",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    fontFamily: theme.font.regular,
    color: "grey",
    marginLeft: 8,
  },
  reportPetContainer: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportPetHeading: {
    fontSize: 20,
    fontFamily: theme.font.bold,
    color: "#212121",
    marginBottom: 8,
    textAlign: "center",
  },
  reportPetDescription: {
    fontSize: 15,
    fontFamily: theme.font.regular,
    color: "#424242",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  reportPetButton: {
    backgroundColor: "#4BB329",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    width: "100%",
  },
  reportPetButtonText: {
    fontSize: 16,
    fontFamily: theme.font.bold,
    color: "#fff",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.tgray,
  },
  swiperContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.232,
    paddingVertical: 20,
    marginBottom: 20,
  },
  swiper: {},
  adSlide: {
    flex: 1,
    paddingHorizontal: 20,
  },
  adImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.primary,
  },
});

export default VetDetails;

