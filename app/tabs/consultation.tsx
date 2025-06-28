import { StyleSheet, Text, View } from "react-native";

const Consultation = () => {
  return (
    <View style={styles.container}>
      <Text>Consultation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Consultation;
