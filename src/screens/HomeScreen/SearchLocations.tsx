import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
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

interface SearchLocationsProps {}

export const MOODS = [
  { value: "happy", img: IMAGES.pr1 },
  { value: "sad", img: IMAGES.pr2 },
  { value: "angry", img: IMAGES.pr3 },
  { value: "excited", img: IMAGES.pr4 },
  { value: "tired", img: IMAGES.pr5 },
];

const CityItem = ({ item, onSelect }: { item: any; onSelect: (cityId: string) => void }) => {
  const handlePress = () => {
    const cityId = item.id?.toString() || item.code || item.value || String(item.id || item);
    onSelect(cityId);
  };

  return (
    <TouchableOpacity style={styles.cityItem} onPress={handlePress}>
      <Typography textType="regular" size={16}>
        {item.name || item.city_name || item.title || String(item)}
        {item.country ? `, ${item.country}` : ""}
      </Typography>
    </TouchableOpacity>
  );
};

const SearchLocations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxCountry = useSelector((state: States) => state.Others.country);
  const countries = useSelector((state: States) => state.Main.Countries);
  const cities = useSelector((state: States) => state.Main.Cities);

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

    return "1";
  }, [reduxCountry, countries]);

  useFocusEffect(
    React.useCallback(() => {
      const countryId = getCountryId();
      dispatch(MainActions.GetCitiesByCountry({ countryId }));
    }, [dispatch, getCountryId])
  );

  const formattedCities = React.useMemo(() => {
    if (!cities) return [];

    if (!Array.isArray(cities) && (cities as any)?.error) {
      return [];
    }

    if (Array.isArray(cities)) {
      return cities;
    }

    return [];
  }, [cities]);

  const handleCitySelect = React.useCallback(
    (cityId: string) => {
      dispatch(setCity(cityId));
      onBack();
    },
    [dispatch]
  );

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
    borderBottomColor: "#E0E0E0",
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchLocations;

