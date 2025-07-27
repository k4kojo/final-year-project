import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  location: string;
  image: string;
  onJoinCall?: () => void;
  onChat?: () => void;
};

const DoctorCard = ({
  name,
  specialty,
  date,
  time,
  type,
  location,
  image,
  onJoinCall,
  onChat,
}: Props) => {
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brand = Colors.brand;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View>
          <Text style={[styles.name, { color: themeColors.text }]}>{name}</Text>
          <Text style={[styles.specialty, { color: themeColors.subText }]}>
            {specialty}
          </Text>
        </View>
      </View>

      <Text style={[styles.details, { color: themeColors.subText }]}>
        {date} | {time}
      </Text>
      <Text style={[styles.details, { color: themeColors.subText }]}>
        {type}
      </Text>
      <Text style={[styles.details, { color: themeColors.subText }]}>
        {location}
      </Text>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={onJoinCall}
          style={[styles.button, { backgroundColor: brand.secondary }]}
        >
          <Ionicons name="videocam-outline" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>Join Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onChat}
          style={[
            styles.button,
            { backgroundColor: theme === "dark" ? "#444" : "#000" },
          ]}
        >
          <Ionicons name="chatbubble-outline" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  specialty: {
    fontSize: 13,
  },
  details: {
    fontSize: 13,
    marginVertical: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
