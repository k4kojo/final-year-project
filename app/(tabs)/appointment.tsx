import { StyleSheet, Text, View } from "react-native";

const Appointments = () => {
  return (
    <View style={styles.container}>
      <Text>Appointments Screen</Text>
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

export default Appointments;
