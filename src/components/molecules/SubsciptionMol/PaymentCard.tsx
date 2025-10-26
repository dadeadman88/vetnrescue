import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { IMAGES } from "../../../constants";

const PaymentCard = () => {
  const [selectedId, setSelectedId] = useState(1);
  const SUBSCRIPTION_ITEM = [
    {
      id: 1,
      title: "Credit Card",
      description: "Pay withh Master card Visa or Visa Electron",
    },
    {
      id: 2,
      title: "Internet Banking",
      description: "Pay directly from your bank account",
    },
    {
      id: 3,
      title: "Paypal",
      description: "Faster and safe way to send money",

    },
    {
      id: 4,
      title: "Bitcoin Wallet",
      description: "Send the amount in our Bitcoin Wallet",

    },
  ];
  const SubscriptionCard = ({ item }: any) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.cardStyle, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)} >
        <View style={styles.cardContent}>
          <Typography textType="semiBold" size={theme.fontSize.large}>
            {item.title}
          </Typography>
          <Typography size={theme.fontSize.small}>{item.description}</Typography>
        </View>
       
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={SUBSCRIPTION_ITEM}
      renderItem={({ item }) => <SubscriptionCard item={item} />}
      keyExtractor={(item) => item.id.toString()} 
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
    flexDirection: 'row',
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: theme.color.inputTypeColor,
  },
  selectedCard: {
    borderColor:theme.color.primary,
  },
  cardContent: {
    flex: 1, 
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default PaymentCard;
