import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { IMAGES } from "../../../constants";

const SubscriptionPackages = () => {
  const [selectedId, setSelectedId] = useState(1);
  const SUBSCRIPTION_ITEM = [
    {
      id: 1,
      title: `"Reset & Refocus" – 1 Month Starter Package`,
      price: "$375 (value = $380 — small incentive to commit)",
      description: `Perfect for: New clients looking for a short-term jumpstart or trial of coaching.
•	1 x 60-minute initial consultation
•	3 x 35-minute weekly follow-up sessions
•	Unlimited text/email support between sessions
•	Personalized action plan`,
    },
    {
      id: 2,
      title: ` "Momentum Builder" – 3 Month Coaching Package`,
      price: "$1,095 (value = $1,160 – save $65)",
      description:`Perfect for: Clients ready to build sustainable habits and see meaningful change over 90 days.
•	1 x 60-minute initial consultation
•	9 x 35-minute weekly follow-up sessions (3/month)
•	Unlimited text/email support
•	Nutrition and movement suggestions`
    },
    {
      id: 3,
      title: `"Total Transformation" – 6 Month Premium Coaching Plan`,
      price: "$2,050 (value = $2,240 – save $190)",
      description:`Perfect for: Clients committed to long-term transformation and accountability.
•	1 x 60-minute initial consultation
•	18 x 35-minute follow-ups (3/month)
•	Unlimited text/email support
•	Nutrition and movement integration support
•	Priority scheduling`
    },
  ];

  const SubscriptionCard = ({ item }: any) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.cardStyle, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <View style={styles.cardContent}>
          <Typography textType="semiBold">{item.title}</Typography>
          
          <Typography size={theme.fontSize.extraSmall}>{item.description}</Typography>
          <Typography textType="medium">
            {item.price}
          </Typography>
        </View>
        
        {isSelected && (
          <Image
            source={IMAGES.click}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={SUBSCRIPTION_ITEM}
      renderItem={({ item }) => <SubscriptionCard item={item} />}
      // keyExtractor={(item) => item?.id}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: theme.color.inputTypeColor,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.color.inputTypeColor,
  },
  selectedCard: {
    borderColor: theme.color.primary,
  },
  cardContent: {
    flex: 1,
    gap:10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default SubscriptionPackages;
