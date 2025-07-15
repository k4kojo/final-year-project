import Button from "@/components/button.component";
import DoctorCard from "@/components/doctor-card";
import TopHeader from "@/components/top-header.component";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">(
    "upcoming"
  );

  const mockAppointments = {
    upcoming: [
      {
        id: "1",
        name: "Dr. Ama Mensah",
        specialty: "Cardiologist",
        date: "7 June, 2025",
        time: "3:00PM",
        type: "Online",
        location: "Korle-bu Teaching Hospital",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "2",
        name: "Dr. Kofi Asante",
        specialty: "Dermatologist",
        date: "10 June, 2025",
        time: "11:00AM",
        type: "In-person",
        location: "Tema General Hospital",
        image: "https://randomuser.me/api/portraits/men/21.jpg",
      },
    ],
    past: [
      {
        id: "3",
        name: "Dr. Linda Owusu",
        specialty: "Pediatrician",
        date: "1 May, 2025",
        time: "9:00AM",
        type: "Online",
        location: "37 Military Hospital",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TopHeader screen="appointments" />

      {/* Sticky Tab Bar */}
      <View style={styles.tabContainer}>
        {["upcoming", "past"].map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab as "upcoming" | "past")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.appointmentCardContainer}>
        {mockAppointments[selectedTab].map((appt) => (
          <DoctorCard
            key={appt.id}
            {...appt}
            onEdit={() => console.log("Editing", appt.id)}
            onCancel={() => console.log("Cancelling", appt.id)}
          />
        ))}

        <View style={{ marginTop: 20 }}>
          <Button
            title="Book appointment"
            onPress={() => router.push("/appointment/schedule")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTab: {
    backgroundColor: "#2155CD",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  appointmentCardContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default Appointments;
