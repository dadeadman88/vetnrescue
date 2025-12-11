import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { commonStyles } from "../../../globalStyle";
import { navigate, reset } from "../../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { States } from "../../../utils/types";
import { setLanguage, setCountry, setState, setCity } from "../../../redux/slices/OtherSlice";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { MainActions } from "../../../redux/actions/MainActions";
import { AppDispatch } from "../../../redux/store";

const ProfileList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: States) => state.Others.language);
  const reduxCountry = useSelector((state: States) => state.Others.country);
  const reduxState = useSelector((state: States) => state.Others.state);
  const reduxCity = useSelector((state: States) => state.Others.city);
  const countries = useSelector((state: States) => state.Main.Countries);
  const states = useSelector((state: States) => state.Main.States);
  const cities = useSelector((state: States) => state.Main.Cities);
  const loading = useSelector((state: States) => state.Others.loading);
  
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState<string | null>(reduxCountry);
  const [countryItems, setCountryItems] = useState([
    { label: 'United Arab Emirates', value: 'UAE' },
    { label: 'Saudi Arabia', value: 'KSA' },
  ]);
  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState<string | null>(reduxState);
  const [stateItems, setStateItems] = useState([
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
    { label: 'Riyadh', value: 'Riyadh' },
    { label: 'Jeddah', value: 'Jeddah' },
  ]);
  const [statesErrorMessage, setStatesErrorMessage] = useState<string | null>(null);
  const [citiesErrorMessage, setCitiesErrorMessage] = useState<string | null>(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState<string | null>(reduxCity);
  const [cityItems, setCityItems] = useState([
    { label: 'Downtown Dubai', value: 'Downtown Dubai' },
    { label: 'Marina', value: 'Marina' },
    { label: 'Al Khalidiyah', value: 'Al Khalidiyah' },
    { label: 'Al Markaziyah', value: 'Al Markaziyah' },
    { label: 'Al Olaya', value: 'Al Olaya' },
    { label: 'Al Hamra', value: 'Al Hamra' },
  ]);

  // Call API when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      dispatch(MainActions.GetCountries());
    }, [dispatch])
  );

  // Update country items when countries data is loaded
  useEffect(() => {
    if (countries && Array.isArray(countries) && countries.length > 0) {
      const formattedCountries = countries.map((country: any) => ({
        label: country.name || country.title || country.label || country.country_name || String(country),
        value: country.id?.toString() || country.code || country.value || String(country),
      }));
      setCountryItems(formattedCountries);
      
      // Ensure countryValue is set from Redux if it exists and matches an item
      if (reduxCountry) {
        const matchingCountry = formattedCountries.find(item => item.value === reduxCountry);
        if (matchingCountry && countryValue !== reduxCountry) {
          setCountryValue(reduxCountry);
        }
      }
    }
  }, [countries, reduxCountry]);

  // Load states when country is selected in Redux and countries are loaded
  useEffect(() => {
    if (reduxCountry && countries && Array.isArray(countries) && countries.length > 0) {
      const selectedCountry = countries.find((country: any) => {
        const countryValue = country.id?.toString() || country.code || country.value || String(country);
        return countryValue === reduxCountry;
      });
      const countryCode = selectedCountry?.code?.toLowerCase() || 
                          selectedCountry?.id?.toString()?.toLowerCase() || 
                          reduxCountry?.toLowerCase();
      if (countryCode) {
        // Only load if states haven't been loaded yet or if they're empty
        const statesLoaded = states && (
          (Array.isArray(states) && states.length > 0) ||
          (typeof states === 'object' && !Array.isArray(states) && (states as any)?.error)
        );
        if (!statesLoaded) {
          dispatch(MainActions.GetStates({ countryCode }));
        }
      }
    }
  }, [reduxCountry, countries, dispatch, states]);

  // Load cities when state is selected in Redux and states are loaded
  useEffect(() => {
    if (reduxState && states && Array.isArray(states) && states.length > 0) {
      const selectedState = states.find((state: any) => {
        const stateValue = state.id?.toString() || state.code || state.value || String(state);
        return stateValue === reduxState;
      });
      const stateCode = selectedState?.code?.toLowerCase() || 
                        selectedState?.id?.toString()?.toLowerCase() || 
                        reduxState?.toLowerCase();
      if (stateCode) {
        // Only load if cities haven't been loaded yet or if they're empty
        const citiesLoaded = cities && (
          (Array.isArray(cities) && cities.length > 0) ||
          (typeof cities === 'object' && !Array.isArray(cities) && (cities as any)?.error)
        );
        if (!citiesLoaded) {
          dispatch(MainActions.GetCities({ stateCode }));
        }
      }
    }
  }, [reduxState, states, dispatch, cities]);

  // Update state items when states data is loaded
  useEffect(() => {
    if (!countryValue && !reduxCountry) {
      // Show "No states available" message in dropdown when no country is selected
      setStateItems([{
        label: language === 'ar' ? 'لا توجد ولايات متاحة' : 'No states available',
        value: '__empty__',
        disabled: true,
      }] as any);
      if (!reduxState) {
        setStateValue(null);
        dispatch(setState(null));
      }
      setStatesErrorMessage(null);
    } else if (states) {
      // Check if states is an error response object
      const statesObj = states as any;
      if (!Array.isArray(states) && statesObj?.error === true) {
        // Show API error message in dropdown
        const errorMessage = statesObj?.message || "No states found for this country";
        setStateItems([{
          label: errorMessage,
          value: '__empty__',
          disabled: true,
        }] as any);
        setStateValue(null);
        dispatch(setState(null));
        setStatesErrorMessage(errorMessage);
      } else if (Array.isArray(states) && states.length > 0) {
        const formattedStates = states.map((state: any) => ({
          label: state.name || state.title || state.label || state.state_name || String(state),
          value: state.id?.toString() || state.code || state.value || String(state),
        }));
        setStateItems(formattedStates);
        setStatesErrorMessage(null);
        
        // Ensure stateValue is set from Redux if it exists and matches an item
        if (reduxState) {
          const matchingState = formattedStates.find(item => item.value === reduxState);
          if (matchingState && stateValue !== reduxState) {
            setStateValue(reduxState);
          }
        }
      } else {
        // Empty array or no states - show message in dropdown
        setStateItems([{
          label: "No states found for this country",
          value: '__empty__',
          disabled: true,
        }] as any);
        setStateValue(null);
        dispatch(setState(null));
        setStatesErrorMessage("No states found for this country");
      }
    }
  }, [states, countryValue, reduxState, dispatch, language]);

  // Update city items when cities data is loaded
  useEffect(() => {
    if (!stateValue && !reduxState) {
      // Show "No cities available" message in dropdown when no state is selected
      setCityItems([{
        label: language === 'ar' ? 'لا توجد مدن متاحة' : 'No cities available',
        value: '__empty__',
        disabled: true,
      }] as any);
      if (!reduxCity) {
        setCityValue(null);
        dispatch(setCity(null));
      }
      setCitiesErrorMessage(null);
    } else if (cities) {
      // Check if cities is an error response object
      const citiesObj = cities as any;
      if (!Array.isArray(cities) && citiesObj?.error === true) {
        // Show API error message in dropdown
        const errorMessage = citiesObj?.message || "No cities found for this state";
        setCityItems([{
          label: errorMessage,
          value: '__empty__',
          disabled: true,
        }] as any);
        setCityValue(null);
        dispatch(setCity(null));
        setCitiesErrorMessage(errorMessage);
      } else if (Array.isArray(cities) && cities.length > 0) {
        const formattedCities = cities.map((city: any) => ({
          label: city.name || city.title || city.label || city.city_name || String(city),
          value: city.id?.toString() || city.code || city.value || String(city),
        }));
        setCityItems(formattedCities);
        setCitiesErrorMessage(null);
        
        // Ensure cityValue is set from Redux if it exists and matches an item
        if (reduxCity) {
          const matchingCity = formattedCities.find(item => item.value === reduxCity);
          if (matchingCity && cityValue !== reduxCity) {
            setCityValue(reduxCity);
          }
        }
      } else {
        // Empty array or no cities - show message in dropdown
        setCityItems([{
          label: "No cities found for this state",
          value: '__empty__',
          disabled: true,
        }] as any);
        setCityValue(null);
        dispatch(setCity(null));
        setCitiesErrorMessage("No cities found for this state");
      }
    }
  }, [cities, stateValue, reduxCity, dispatch, language]);

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
    },
    {
      id: 6,
      title: "City",
      titleAr: "المدينة",
      image: IMAGES.lang,
      params: { title: "City" },
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
                <Typography style={styles.title} size={theme.fontSize.medium}>{displayTitle}</Typography>
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
        <View style={{ width: "100%", zIndex: 2000 }}>
          <View row marginV-20>
            <Image
              source={item.image}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <View marginL-10 flex>
              <DropDownPicker
                open={countryOpen}
                value={countryValue}
                items={countryItems}
                setOpen={(isOpen) => {
                  const newValue = typeof isOpen === 'function' ? isOpen(countryOpen) : isOpen;
                  setCountryOpen(newValue);
                  if (newValue) {
                    setStateOpen(false);
                    setCityOpen(false);
                  }
                }}
                setValue={setCountryValue}
                onChangeValue={(value) => {
                  // Ensure we only store serializable values (string or null) in Redux
                  let stringValue: string | null = null;
                  if (value === null || value === undefined) {
                    stringValue = null;
                  } else if (typeof value === 'string') {
                    stringValue = value;
                  } else if (typeof value !== 'function') {
                    stringValue = String(value);
                  }
                  
                  // Update Redux
                  dispatch(setCountry(stringValue));
                  
                  // Clear states and city when country changes
                  setStateItems([]);
                  setStateValue(null);
                  dispatch(setState(null));
                  setCityValue(null);
                  dispatch(setCity(null));
                  
                  // Call API to get states for selected country
                  if (stringValue) {
                    // Find country code from countries array or countryItems
                    let selectedCountry = countries.find((country: any) => {
                      const countryValue = country.id?.toString() || country.code || country.value || String(country);
                      return countryValue === stringValue;
                    });
                    
                    // If not found in countries array, try countryItems
                    if (!selectedCountry && countryItems.length > 0) {
                      const matchingItem = countryItems.find(item => item.value === stringValue);
                      if (matchingItem) {
                        // Find the original country object from countries array
                        selectedCountry = countries.find((country: any) => {
                          const countryValue = country.id?.toString() || country.code || country.value || String(country);
                          return countryValue === stringValue;
                        });
                      }
                    }
                    
                    // Get country code - try code, id, or value itself (lowercase for API)
                    const countryCode = selectedCountry?.code?.toLowerCase() || 
                                       selectedCountry?.id?.toString()?.toLowerCase() || 
                                       stringValue?.toLowerCase();
                    if (countryCode) {
                      dispatch(MainActions.GetStates({ countryCode }));
                    }
                  }
                }}
                setItems={setCountryItems}
                placeholder={language === 'ar' ? 'اختر الدولة' : 'Select Country'}
                style={styles.dropdownPicker}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                textStyle={styles.dropdownText}
                labelStyle={styles.dropdownLabel}
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>
          </View>
          <View style={commonStyles.lineBar} />
        </View>
      );
    }
    else if(item.id === 5){
      return (
        <View style={{ width: "100%", zIndex: 1000 }}>
          <View row marginV-20>
            <Image
              source={item.image}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <View marginL-10 flex>
              <DropDownPicker
                open={stateOpen}
                value={stateValue}
                items={stateItems}
                setOpen={(isOpen) => {
                  const newValue = typeof isOpen === 'function' ? isOpen(stateOpen) : isOpen;
                  setStateOpen(newValue);
                  if (newValue) {
                    setCountryOpen(false);
                    setCityOpen(false);
                  }
                }}
                setValue={setStateValue}
                onChangeValue={(value) => {
                  // Ensure we only store serializable values (string or null) in Redux
                  let stringValue: string | null = null;
                  if (value === null || value === undefined) {
                    stringValue = null;
                  } else if (typeof value === 'string') {
                    stringValue = value;
                  } else if (typeof value !== 'function') {
                    stringValue = String(value);
                  }
                  dispatch(setState(stringValue));
                  
                  // Clear cities when state changes
                  setCityItems([]);
                  setCityValue(null);
                  dispatch(setCity(null));
                  
                  // Call API to get cities for selected state
                  if (stringValue) {
                    // Find state code from states array
                    const selectedState = states.find((state: any) => {
                      const stateValue = state.id?.toString() || state.code || state.value || String(state);
                      return stateValue === stringValue;
                    });
                    
                    // Get state code - try code, id, or value itself (lowercase for API)
                    const stateCode = selectedState?.code?.toLowerCase() || 
                                     selectedState?.id?.toString()?.toLowerCase() || 
                                     stringValue?.toLowerCase();
                    if (stateCode) {
                      dispatch(MainActions.GetCities({ stateCode }));
                    }
                  }
                }}
                setItems={setStateItems}
                placeholder={language === 'ar' ? 'اختر الولاية' : 'Select State'}
                disabled={!countryValue || (stateItems.length === 1 && (stateItems[0] as any)?.disabled)}
                style={styles.dropdownPicker}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                textStyle={styles.dropdownText}
                labelStyle={styles.dropdownLabel}
                zIndex={1000}
                zIndexInverse={2000}
              />
            </View>
          </View>
          <View style={commonStyles.lineBar} />
        </View>
      );
    }
    else if(item.id === 6){
      return (
        <View style={{ width: "100%", zIndex: 500 }}>
          <View row marginV-20>
            <Image
              source={item.image}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <View marginL-10 flex>
              <DropDownPicker
                open={cityOpen}
                value={cityValue}
                items={cityItems}
                setOpen={(isOpen) => {
                  const newValue = typeof isOpen === 'function' ? isOpen(cityOpen) : isOpen;
                  setCityOpen(newValue);
                  if (newValue) {
                    setCountryOpen(false);
                    setStateOpen(false);
                  }
                }}
                setValue={setCityValue}
                onChangeValue={(value) => {
                  // Ensure we only store serializable values (string or null) in Redux
                  let stringValue: string | null = null;
                  if (value === null || value === undefined) {
                    stringValue = null;
                  } else if (typeof value === 'string') {
                    stringValue = value;
                  } else if (typeof value !== 'function') {
                    stringValue = String(value);
                  }
                  dispatch(setCity(stringValue));
                }}
                setItems={setCityItems}
                placeholder={language === 'ar' ? 'اختر المدينة' : 'Select City'}
                disabled={!stateValue || (cityItems.length === 1 && (cityItems[0] as any)?.disabled)}
                style={styles.dropdownPicker}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                textStyle={styles.dropdownText}
                labelStyle={styles.dropdownLabel}
                zIndex={500}
                zIndexInverse={2500}
              />
            </View>
          </View>
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
                <Typography style={styles.title} size={theme.fontSize.medium}>{displayTitle}</Typography>
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
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.color.primary} />
        </View>
      )}
      <FlatList
        data={DATA}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownPicker: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.divider,
    ...commonStyles.boxShadow,
  },
  dropdownText: {
    fontSize: theme.fontSize.medium,
  },
  dropdownLabel: {
    fontSize: theme.fontSize.medium,
  },
  title: {
    paddingTop: 3
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default ProfileList;
