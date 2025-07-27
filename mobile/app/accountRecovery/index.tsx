import Button from "@/components/button.component";
import TextInputField from "@/components/inputs/textInputField.component";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RecoverAccountScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>Reset Password</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Enter your phone number, we will send a{"\n"}
        verification code to email
      </Text>

      {/* Input Label */}
      <Text style={styles.inputLabel}>Type your phone number</Text>

      {/* Phone Number Input */}
      <TextInputField
        placeholder="+628..."
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Send Link Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={"Send Link"}
          onPress={() => router.push("/accountRecovery/getOTP")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.subtitle || "#6b7280",
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    color: "#ef4444", // red
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 20,
  },
});
