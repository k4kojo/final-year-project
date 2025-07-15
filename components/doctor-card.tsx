import Colors from "@/constants/colors";
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
  onEdit?: () => void;
  onCancel?: () => void;
};

const DoctorCard = ({
  name,
  specialty,
  date,
  time,
  type,
  location,
  image,
  onEdit,
  onCancel,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.specialty}>{specialty}</Text>
        </View>
      </View>
      <Text style={styles.details}>
        {date} | {time}
      </Text>
      <Text style={styles.details}>{type}</Text>
      <Text style={styles.details}>{location}</Text>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, styles.editButton]}
        >
          <Ionicons name="videocam-outline" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>Join Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.button, styles.cancelButton]}
        >
          <Ionicons name="chatbubble-outline" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
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
    color: "gray",
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
  editButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default DoctorCard;
