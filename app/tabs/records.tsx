import TopHeader from "@/components/top-header.component";
import { StyleSheet, Text, View } from "react-native";

const Records = () => {
  return (
    <View style={styles.container}>
      <TopHeader screen="records" />
      <Text>Records Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Records;
