import Colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  screen?: "home" | "appointments" | "consult" | "records" | "profile";
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export default function TopHeader({
  screen,
  onLeftPress,
  onRightPress,
}: Props) {
  return (
    <View style={styles.topHeader}>
      {screen === "home" ? (
        <>
          <TouchableOpacity onPress={onLeftPress}>
            <MaterialCommunityIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRightPress}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {(screen ?? "").charAt(0).toUpperCase() + (screen ?? "").slice(1)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "18%",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: Colors.primary,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});
