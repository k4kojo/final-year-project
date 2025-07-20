import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type WelcomeCardProps = {
  profileImage?: string;
  themeColors: any;
  brandColors: any;
};

const WelcomeCard = ({
  profileImage,
  themeColors,
  brandColors,
}: WelcomeCardProps) => {
  return (
    <View style={[styles.welcomeCard, { backgroundColor: themeColors.card }]}>
      <View style={styles.userInfo}>
        <Text style={[styles.welcomeText, { color: themeColors.text }]}>
          Welcome Sylvester!
        </Text>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Ionicons name="person" size={24} color="#888" />
          </View>
        )}
      </View>

      <View style={styles.welcomeSummary}>
        <SummaryItem
          number="0"
          label="Upcoming appointments"
          brandColors={brandColors}
          themeColors={themeColors}
        />
        <SummaryItem
          number="0"
          label="Records"
          brandColors={brandColors}
          themeColors={themeColors}
        />
      </View>
    </View>
  );
};

const SummaryItem = ({ number, label, brandColors, themeColors }: any) => (
  <View style={styles.summaryItem}>
    <Text style={[styles.summaryNumber, { color: brandColors.primary }]}>
      {number}
    </Text>
    <Text style={[styles.summaryLabel, { color: themeColors.subText }]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  welcomeCard: {
    padding: 20,
    marginTop: -20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 6,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  avatarFallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  welcomeSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryLabel: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default WelcomeCard;
