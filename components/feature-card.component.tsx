import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  icon: string;
};

const FeatureCard = ({ title, description, icon }: Props) => (
  <View style={styles.card}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: "47%",
    padding: 15,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    marginVertical: 5,
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});

export default FeatureCard;
