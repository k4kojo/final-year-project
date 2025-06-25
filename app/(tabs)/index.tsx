import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
    alignItems: "center",
    padding: 16,
    // backgroundColor: Color.primary,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
