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
  { id: '1', name: 'Downtown Dubai', country: 'UAE' },
  { id: '2', name: 'Dubai Marina', country: 'UAE' },
  { id: '3', name: 'JBR - Jumeirah Beach Residence', country: 'UAE' },
  { id: '4', name: 'Business Bay', country: 'UAE' },
  { id: '5', name: 'Palm Jumeirah', country: 'UAE' },
  { id: '6', name: 'Corniche Area', country: 'UAE' },
  { id: '7', name: 'Yas Island', country: 'UAE' },
  { id: '8', name: 'Al Reem Island', country: 'UAE' },
  { id: '9', name: 'Al Khalidiyah', country: 'UAE' },
  { id: '10', name: 'Al Majaz', country: 'UAE' },
  { id: '11', name: 'Al Qasimia', country: 'UAE' },
  { id: '12', name: 'Al Nahda', country: 'UAE' },
  { id: '13', name: 'Al Jimi', country: 'UAE' },
  { id: '14', name: 'Al Ain City Center', country: 'UAE' },
  { id: '15', name: 'Al Marjan Island', country: 'UAE' },
  { id: '16', name: 'Al Hamra', country: 'UAE' },
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
