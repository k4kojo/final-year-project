import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/75.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sylvester Mensah</Text>
        <Text style={styles.email}>sylvester@example.com</Text>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-outline" size={20} color="#555" />
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="lock-closed-outline" size={20} color="#555" />
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={20} color="#555" />
          <Text style={styles.itemText}>Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="help-circle-outline" size={20} color="#555" />
          <Text style={styles.itemText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="log-out-outline" size={20} color="#e11d48" />
          <Text style={[styles.itemText, { color: "#e11d48" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
});
