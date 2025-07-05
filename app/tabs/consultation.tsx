import TopHeader from "@/components/top-header.component";
import { StyleSheet, Text, View } from "react-native";

const Consultation = () => {
  return (
    <View style={styles.container}>
      <TopHeader screen="consult" />
      <Text>Consultation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Consultation;
