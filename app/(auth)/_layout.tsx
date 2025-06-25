import { Slot } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Color from "@/constants/colors";

export default function RootLayout() {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Image
            source={require("@/assets/images/stethoscope.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>MediConnect</Text>
        <Text style={styles.tagline}>Bringing healthcare to your doorstep</Text>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: Color.primary,
    alignItems: "center",
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    marginTop: 60,
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    color: Color.primary,
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
});
