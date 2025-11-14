import React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Image, TouchableOpacity, TextInput, StyleSheet, View as RNView, FlatList, Linking, Alert } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme, SCREENS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { States } from "../../utils/types";

interface AdItem {
  id: string;
  imageUrl: string;
  url: string;
}

const adData: AdItem[] = [
  {
    id: '1',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxPIDfYULL2ryNPAr9BE5xOYqaGw6iJJEDw&s',
    url: 'https://www.happypaws.ae/',
  },
  {
    id: '2',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxPIDfYULL2ryNPAr9BE5xOYqaGw6iJJEDw&s',
    url: 'https://www.happypaws.ae/',
  },
  {
    id: '3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxPIDfYULL2ryNPAr9BE5xOYqaGw6iJJEDw&s',
    url: 'https://www.happypaws.ae/',
  },
];

const Notification = () => {
  const navigation = useNavigation<any>();
  const language = useSelector((state: States) => state.Others.language);
  const isRTL = language === 'ar';

  const handleAdPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open link');
    }
  };

  return (
    <SafeAreaContainer safeArea={true}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerRow}>
            <View style={styles.logoContainer}>
              <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => navigation.navigate(SCREENS.ADD_MOOD)}
            >
              <Image source={IMAGES.filterLocation} style={styles.notificationImage} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={adData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.adContainer}
              onPress={() => handleAdPress(item.url)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.adImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  },
  logoImage: {
    width: "50%",
    height: 70,
  },
  notificationButton: {
    alignItems: "flex-end",
  },
  notificationImage: {
    width: 25,
    height: 25,
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
  listContent: {
    padding: 10,
  },
  adContainer: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  adImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default Notification;
