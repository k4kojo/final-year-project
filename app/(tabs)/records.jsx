import { StyleSheet, Text, View } from "react-native";

const Records = () => {
  return (
    <View style={styles.container}>
      <Text>Records Screen</Text>
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

export default Records;
