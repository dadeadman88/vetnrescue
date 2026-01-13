import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Typography } from "../../components/atoms/Typography";
import { onBack } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { States } from "../../utils/types";
import { useFocusEffect } from "@react-navigation/native";
import { MainActions } from "../../redux/actions/MainActions";
import { AppDispatch } from "../../redux/store";
import { setCity } from "../../redux/slices/OtherSlice";

interface AddMoodProps {}

const CityItem = ({ item, onSelect }: { item: any; onSelect: (cityId: string) => void }) => {
  const handlePress = () => {
    // Extract city ID from the item
    const cityId = item.id?.toString() || item.code || item.value || String(item.id || item);
    onSelect(cityId);
  };

  return (
    <TouchableOpacity style={styles.cityItem} onPress={handlePress}>
      <Typography textType="regular" size={16}>
        {item.name || item.city_name || item.title || String(item)}
        {item.country ? `, ${item.country}` : ''}
      </Typography>
    </TouchableOpacity>
  );
};

const AddMood = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxCountry = useSelector((state: States) => state.Others.country);
  const countries = useSelector((state: States) => state.Main.Countries);
  const cities = useSelector((state: States) => state.Main.Cities);

  // Get country ID from Redux state or use default ID 1
  const getCountryId = React.useCallback(() => {
    if (reduxCountry && countries && Array.isArray(countries) && countries.length > 0) {
      const selectedCountry = countries.find((country: any) => {
        const countryValue = country.id?.toString() || country.code || country.value || String(country);
        return countryValue === reduxCountry;
      });
      
      if (selectedCountry?.id) {
        return selectedCountry.id.toString();
      }
    }
    // Default to ID 1 if no country is selected
    return '1';
  }, [reduxCountry, countries]);

  // Fetch cities when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const countryId = getCountryId();
      dispatch(MainActions.GetCitiesByCountry({ countryId }));
    }, [dispatch, getCountryId])
  );

  // Format cities data for display
  const formattedCities = React.useMemo(() => {
    if (!cities) return [];
    
    // Handle error response
    if (!Array.isArray(cities) && (cities as any)?.error) {
      return [];
    }
    
    // Handle array of cities
    if (Array.isArray(cities)) {
      return cities;
    }
    
    return [];
  }, [cities]);

  // Handle city selection
  const handleCitySelect = React.useCallback((cityId: string) => {
    // Store city ID in Redux
    dispatch(setCity(cityId));
    // Navigate back
    onBack();
  }, [dispatch]);

  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 center marginT-20>
        <Typography textType="semiBold" size={theme.fontSize.large20}>
          Select Location
        </Typography>
      </View>
      <FlatList
        data={formattedCities}
        renderItem={({ item }) => <CityItem item={item} onSelect={handleCitySelect} />}
        keyExtractor={(item, index) => item.id?.toString() || item.code || index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography textType="regular" size={16} color={theme.color.descColor}>
              No cities available
            </Typography>
          </View>
        }
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  cityItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddMood;
