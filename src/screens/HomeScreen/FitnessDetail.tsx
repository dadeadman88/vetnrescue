import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, View as RNView, Text, FlatList, Linking, RefreshControl } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme, SCREENS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { States } from "../../utils/types";
import { onBack } from "../../navigation/RootNavigation";
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

const MapPinIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill="#5FBF3A"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 122.88 122.27">
    <Path
      d="M33.84,50.25c4.13,7.45,8.89,14.6,15.07,21.12c6.2,6.56,13.91,12.53,23.89,17.63c0.74,0.36,1.44,0.36,2.07,0.11 c0.95-0.36,1.92-1.15,2.87-2.1c0.74-0.74,1.66-1.92,2.62-3.21c3.84-5.05,8.59-11.32,15.3-8.18c0.15,0.07,0.26,0.15,0.41,0.21 l22.38,12.87c0.07,0.04,0.15,0.11,0.21,0.15c2.95,2.03,4.17,5.16,4.2,8.71c0,3.61-1.33,7.67-3.28,11.1 c-2.58,4.53-6.38,7.53-10.76,9.51c-4.17,1.92-8.81,2.95-13.27,3.61c-7,1.03-13.56,0.37-20.27-1.69 c-6.56-2.03-13.17-5.38-20.39-9.84l-0.53-0.34c-3.31-2.07-6.89-4.28-10.4-6.89C31.12,93.32,18.03,79.31,9.5,63.89 C2.35,50.95-1.55,36.98,0.58,23.67c1.18-7.3,4.31-13.94,9.77-18.32c4.76-3.84,11.17-5.94,19.47-5.2c0.95,0.07,1.8,0.62,2.25,1.44 l14.35,24.26c2.1,2.72,2.36,5.42,1.21,8.12c-0.95,2.21-2.87,4.25-5.49,6.15c-0.77,0.66-1.69,1.33-2.66,2.03 c-3.21,2.33-6.86,5.02-5.61,8.18L33.84,50.25L33.84,50.25L33.84,50.25z"
      fill="#5FBF3A"
    />
  </Svg>
);

const CallIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 122.88 122.27">
    <Path
      d="M33.84,50.25c4.13,7.45,8.89,14.6,15.07,21.12c6.2,6.56,13.91,12.53,23.89,17.63c0.74,0.36,1.44,0.36,2.07,0.11 c0.95-0.36,1.92-1.15,2.87-2.1c0.74-0.74,1.66-1.92,2.62-3.21c3.84-5.05,8.59-11.32,15.3-8.18c0.15,0.07,0.26,0.15,0.41,0.21 l22.38,12.87c0.07,0.04,0.15,0.11,0.21,0.15c2.95,2.03,4.17,5.16,4.2,8.71c0,3.61-1.33,7.67-3.28,11.1 c-2.58,4.53-6.38,7.53-10.76,9.51c-4.17,1.92-8.81,2.95-13.27,3.61c-7,1.03-13.56,0.37-20.27-1.69 c-6.56-2.03-13.17-5.38-20.39-9.84l-0.53-0.34c-3.31-2.07-6.89-4.28-10.4-6.89C31.12,93.32,18.03,79.31,9.5,63.89 C2.35,50.95-1.55,36.98,0.58,23.67c1.18-7.3,4.31-13.94,9.77-18.32c4.76-3.84,11.17-5.94,19.47-5.2c0.95,0.07,1.8,0.62,2.25,1.44 l14.35,24.26c2.1,2.72,2.36,5.42,1.21,8.12c-0.95,2.21-2.87,4.25-5.49,6.15c-0.77,0.66-1.69,1.33-2.66,2.03 c-3.21,2.33-6.86,5.02-5.61,8.18L33.84,50.25L33.84,50.25L33.84,50.25z"
      fill="#FFF"
    />
  </Svg>
);

const MapIcon = ({ color = "#4BB329" }: { color?: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 20L3 17V4L9 7L15 4L21 7V17L15 20L9 20Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 4V20M15 4V20"
      stroke={color}
      strokeWidth="2"
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
  address: string;
  phone: string;
  image_url?: string;
  google_maps_link?: string;
}

// Fallback image URL for clinic cards
const FALLBACK_CLINIC_IMAGE = 'https://www.carecredit.com/sites/cc/image/vet_clinic_vs_animal_hospital.jpg';

const ClinicCard = ({ item, language }: { item: FacilityItem; language: 'en' | 'ar' }) => {
  const handleCall = () => {
    if (item.phone) {
      // Clean phone number: remove spaces, parentheses, dashes, etc., but keep + and digits
      const phoneNumber = item.phone.replace(/[^\d+]/g, '');
      const telUrl = `tel:${phoneNumber}`;
      Linking.openURL(telUrl).catch((err) => {
        console.error('Error opening phone dialer:', err);
      });
    }
  };

  const handleDirections = () => {
    if (item.google_maps_link) {
      Linking.openURL(item.google_maps_link).catch((err) => {
        console.error('Error opening Google Maps:', err);
      });
    }
  };

  // Use fallback image if no image_url is provided
  const imageSource = { uri: item.image_url || FALLBACK_CLINIC_IMAGE };
  
  return (
    <View style={styles.card}>
      <Image
        source={imageSource}
        style={styles.cardImage}
        resizeMode="cover"
      />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.clinicName}>{item.name}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.locationIconButton} onPress={handleDirections}>
              <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/images/mapIcon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.phoneIconButton} onPress={handleCall}>
              <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../assets/images/callIcon.png')} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={[styles.infoRow, { marginLeft: -3 }]}>
        <Image style={{ width: 18, height: 18 }} resizeMode="contain" source={require('../../assets/images/location-icon-small.png')} />
          <Text style={styles.infoText}>{item.address}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Image style={{ width: 15, height: 20 }} resizeMode="contain" source={require('../../assets/images/call-icon-small.png')} />
          <Text style={styles.infoText}>{item.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const ReportPetCard = ({ language }: { language: 'en' | 'ar' }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.reportPetContainer}>
    <Text style={styles.reportPetHeading}>
      {language === 'ar' ? 'وجدت حيوانًا ضالاً؟' : 'Found a stray animal?'}
    </Text>
    <Text style={styles.reportPetDescription}>
      {language === 'ar' 
        ? 'أبلغ عنه الآن وسنساعدك في العثور على أقرب مركز إنقاذ'
        : "Report it now and we'll help you find the nearest rescue center"
      }
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.EDIT_PROFILE)} style={styles.reportPetButton}>
      <DocumentReportIcon />
      <Text style={styles.reportPetButtonText}>
        {language === 'ar' ? 'الإبلاغ عن حيوان ضال' : 'Report Stray Animal'}
      </Text>
    </TouchableOpacity>
  </View>
  );
};

interface AdvertisementItem {
  id: string;
  image_url: string;
  external_link: string;
}

const FitnessDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("All Pets");
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [initialFacilities, setInitialFacilities] = useState<FacilityItem[]>([]);
  const [advertisements, setAdvertisements] = useState<AdvertisementItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const language = useSelector((state: States) => state.Others.language);
  const cityId = useSelector((state: States) => state.Others.city);
  const isRTL = language === 'ar';
  const requestType: "vet" | "rescue" = route?.params?.type ?? "rescue";
  const listHeading =
    requestType === "vet"
      ? language === "ar"
        ? "العيادات البيطرية"
        : "Vet Clinics"
      : language === "ar"
        ? "مراكز الإنقاذ"
        : "Rescue Shelters";
  const searchPlaceholder =
    requestType === "vet"
      ? language === "ar"
        ? "البحث عن العيادات البيطرية..."
        : "Search for vet clinics..."
      : language === "ar"
        ? "البحث عن مراكز الإنقاذ..."
        : "Search for rescue shelters...";

  // Fetch data function (reusable for initial load and refresh)
  const fetchData = async (showLoading: boolean = true) => {
    try {
      if (showLoading) {
        dispatch(setLoading(true));
      }
      
      // Fetch facilities with city_id if available
      const endpoint = requestType === "vet" 
        ? endpoints.GetVetClinics(cityId)
        : endpoints.GetRescueShelters(cityId);
      
      const facilitiesResponse = await client.get(endpoint);
      // Handle both response structures: response.data.data or response.data.response.data
      const facilitiesData = facilitiesResponse.data?.data || facilitiesResponse.data?.response?.data || [];
      
      console.log('API Response:', facilitiesResponse.data);
      console.log('Facilities Data:', facilitiesData);
      
      // Map the API response to include name, address, phone, image_url, and google_maps_link
      const mappedFacilities: FacilityItem[] = facilitiesData.map((facility: any, index: number) => ({
        id: facility.id?.toString() || index.toString(),
        name: facility.name || facility.localized_name || '',
        address: facility.address || facility.localized_address || '',
        phone: facility.phone || '',
        image_url: facility.image_url || facility.image || '',
        google_maps_link: facility.google_maps_link || '',
      }));
      
      console.log('Mapped Facilities:', mappedFacilities);
      setFacilities(mappedFacilities);
      setInitialFacilities(mappedFacilities);

      // Fetch advertisements (without showing separate loader)
      try {
        const adsResponse = await client.get(endpoints.GetAdvertisements);
        const adsData = adsResponse.data?.data || adsResponse.data?.response?.data || [];
        
        const mappedAds: AdvertisementItem[] = adsData.map((ad: any, index: number) => ({
          id: ad.id?.toString() || index.toString(),
          image_url: ad.image_url || '',
          external_link: ad.external_link || '',
        }));
        
        setAdvertisements(mappedAds);
      } catch (adsError) {
        console.error('Error fetching advertisements:', adsError);
        setAdvertisements([]);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setFacilities([]);
      setInitialFacilities([]);
    } finally {
      if (showLoading) {
        dispatch(setLoading(false));
      }
      setRefreshing(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [requestType, cityId, dispatch]);

  // Handle pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(false); // Don't show loading spinner during pull-to-refresh
  };

  // Handle search functionality
  useEffect(() => {
    const searchFacilities = async () => {
      // If search is cleared or has less than 3 characters, show initial data
      if (!searchText || searchText.trim().length < 3) {
        setFacilities(initialFacilities);
        return;
      }

      try {
        dispatch(setLoading(true));
        const searchResponse = await client.get(endpoints.SearchFacilities(searchText.trim(), cityId));
        // Handle both response structures: response.data.data or response.data.response.data
        const searchData = searchResponse.data?.data || searchResponse.data?.response?.data || [];
        
        console.log('Search API Response:', searchResponse.data);
        console.log('Search Data:', searchData);
        
        // Map the search response
        const mappedSearchResults: FacilityItem[] = searchData.map((facility: any, index: number) => ({
          id: facility.id?.toString() || index.toString(),
          name: facility.name || facility.localized_name || '',
          address: facility.address || facility.localized_address || '',
          phone: facility.phone || '',
          image_url: facility.image_url || facility.image || '',
          google_maps_link: facility.google_maps_link || '',
        }));
        
        console.log('Mapped Search Results:', mappedSearchResults);
        setFacilities(mappedSearchResults);
      } catch (error) {
        console.error('Error searching facilities:', error);
        setFacilities([]);
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      searchFacilities();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText, initialFacilities, cityId, dispatch]);

  return (
    <SafeAreaContainer safeArea={true}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={IMAGES.backButton}
                style={{ width: 30, height: 30, }}
              />
            </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
              </View>
              <TouchableOpacity 
                style={[styles.notificationButton, { opacity: 0 }]}
                >
                <Image source={IMAGES.settings} style={styles.notificationImage} resizeMode="contain" />
              </TouchableOpacity>
          </View>
          
          <View style={styles.searchWrapper}>
            <View style={[styles.searchContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <RNView style={[styles.searchIcon, { marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }]}>
                <SearchIcon />
              </RNView>
              <TextInput
                style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
                placeholder={searchPlaceholder}
                placeholderTextColor={theme.color.tgray}
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity 
                style={styles.notificationButton}
                onPress={() => navigation.navigate(SCREENS.ADD_MOOD)}
              >
                <Image source={IMAGES.filterLocation} style={styles.notificationImage} resizeMode="contain" />
            </TouchableOpacity>
            </View>
          </View>
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
                        // Track advertisement click
                        client.post(endpoints.AdvertisementClick(ad.id)).catch((error) => {
                          console.error('Error tracking advertisement click:', error);
                        });
                        // Open external link
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
        
        <FlatList
          data={facilities}
          renderItem={({ item }) => <ClinicCard item={item} language={language} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.color.primary || "#47a2ab"}
              colors={[theme.color.primary || "#47a2ab"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { textAlign: isRTL ? 'right' : 'left' }]}>
                {cityId 
                  ? (language === 'ar' ? 'لا توجد نتائج في هذه المدينة' : 'No results')
                  : (language === 'ar' ? 'لا توجد نتائج' : 'No results')
                }
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    justifyContent: "center"
  },
  logoImage: {
    width: "60%",
    height: 60
  },
  notificationButton: {
    alignItems: "flex-end",
  },
  notificationImage: {
    width: 25,
    height: 25,
    tintColor: "#47a2ab"
  },
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: "green",
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
  swiperContainer: {
    width: "100%",
    height: 200,
    paddingVertical: 20,
  },
  swiper: {
 
  },
  adSlide: {
    flex: 1,
    paddingHorizontal: 20
  },
  adImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.primary
  },
  tabsScrollView: {
    width: "100%",
    paddingVertical: 15,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    gap: 10,
    flexDirection: "row",
  },
  tab: {
    backgroundColor: theme.color.white,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeTab: {
    backgroundColor: "#4BB329",
    borderColor: "#67AE6E",
  },
  tabTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 15,
    fontFamily: theme.font.semibold,
    color: theme.color.black,
  },
  activeTabLabel: {
    color: "#fff",
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  listHeader: {
    paddingBottom: 20,
  },
  listHeaderText: {
    fontSize: 20,
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4BB329",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: "96%",
    height: 170,
    margin: "2%",
    borderRadius: 10
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 10
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
  phoneIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4BB329",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  distance: {
    fontSize: 18,
    fontFamily: theme.font.bold,
    color: "#4BB329",
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
  statusContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  openBadge: {
    backgroundColor: "#E8F5E8",
  },
  closedBadge: {
    backgroundColor: "#FFE8E8",
  },
  statusText: {
    fontSize: 14,
    fontFamily: theme.font.semibold,
    marginLeft: 6,
  },
  openText: {
    color: "#4BB329",
  },
  closedText: {
    color: "#FF0000",
  },
  petIconsContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 16,
  },
  petIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10
  },
  callNowButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4BB329",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  callNowText: {
    fontSize: 15,
    fontFamily: theme.font.semibold,
    color: "#fff",
  },
  directionsButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#4BB329",
    gap: 6,
  },
  directionsText: {
    fontSize: 15,
    fontFamily: theme.font.semibold,
    color: "#4BB329",
  },
  reportPetContainer: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.tgray,
  },
});

export default FitnessDetail;
