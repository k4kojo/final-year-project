import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Divider() {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
  },
});
