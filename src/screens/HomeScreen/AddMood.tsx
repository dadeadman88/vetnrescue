import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import { theme } from "../../constants";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import { DateTimePicker, Text, ToastPresets, View } from "react-native-ui-lib";
import { Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Typography } from "../../components/atoms/Typography";
import { onBack } from "../../navigation/RootNavigation";

interface AddMoodProps {}

const cities = [
  { id: '1', name: 'Dubai', country: 'UAE' },
  { id: '2', name: 'Abu Dhabi', country: 'UAE' },
  { id: '3', name: 'Sharjah', country: 'UAE' },
  { id: '4', name: 'Riyadh', country: 'Saudi Arabia' },
  { id: '5', name: 'Jeddah', country: 'Saudi Arabia' },
  { id: '6', name: 'Mecca', country: 'Saudi Arabia' },
  { id: '7', name: 'Medina', country: 'Saudi Arabia' },
  { id: '8', name: 'Dammam', country: 'Saudi Arabia' },
  { id: '9', name: 'Al Ain', country: 'UAE' },
  { id: '10', name: 'Khobar', country: 'Saudi Arabia' },
  { id: '11', name: 'Taif', country: 'Saudi Arabia' },
  { id: '12', name: 'Ras Al Khaimah', country: 'UAE' },
];

const CityItem = ({ item }: { item: typeof cities[0] }) => {
  return (
    <TouchableOpacity style={styles.cityItem} onPress={onBack}>
      <Typography textType="regular" size={16}>
        {item.name}, {item.country}
      </Typography>
    </TouchableOpacity>
  );
};

const AddMood = () => {
  return (
    <SafeAreaContainer safeArea={false}>
        <View marginH-20 center marginT-20>
          <Typography textType="semiBold" size={theme.fontSize.large20}>
            Select Location
          </Typography>
        </View>
      <FlatList
        data={cities}
        renderItem={({ item }) => <CityItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
});

export default AddMood;
