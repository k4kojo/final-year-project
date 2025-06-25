import Color from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <FontAwesome6 name="menu-sandwich" size={24} color="white" />
        <FontAwesome6 name="bell" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
    alignItems: "center",
    padding: 16,
    backgroundColor: Color.primary,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
