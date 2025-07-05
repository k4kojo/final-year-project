import Colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  viewAll?: boolean;
  emptyMessage: string;
};

const AppointmentSection = ({ title, viewAll = true, emptyMessage }: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {viewAll && <Text style={styles.viewAll}>View All</Text>}
      </View>
      <View style={styles.emptyBox}>
        <Text>{emptyMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  viewAll: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 14,
  },
  emptyBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 10,
  },
});

export default AppointmentSection;
