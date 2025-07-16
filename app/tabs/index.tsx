import AppointmentSection from "@/components/appointment-section.component";
import FeatureCard from "@/components/feature-card.component";
import HealthTips from "@/components/health-tips.component";
import TopHeader from "@/components/top-header.component";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Dashboard = () => {
  const calendar = require("@/assets/images/calendar.png");
  const video = require("@/assets/images/video.png");
  const testTube = require("@/assets/images/test_tube.png");
  const prescription = require("@/assets/images/medical.png");

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/portraits/men/75.jpg"
      );
      const data = await response.json();
      const imageUrl = data?.results?.[0]?.picture?.medium;

      if (imageUrl) {
        setProfileImage(imageUrl);
      } else {
        setProfileImage(null);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
      setProfileImage(null);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopHeader
        screen="home"
        onLeftPress={() => console.log("menu")}
        onRightPress={() => console.log("bell-outline")}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome Sylvester!</Text>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Ionicons name="person" size={24} color="#888" />
              </View>
            )}
          </View>
          <View style={styles.welcomeSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>0</Text>
              <Text style={styles.summaryLabel}>Upcoming appointments</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>0</Text>
              <Text style={styles.summaryLabel}>Records</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actionsGrid}>
          <FeatureCard
            icon={calendar}
            title="Book Appointment"
            description=""
            pressable
            onPress={() => router.replace("/tabs/appointment")}
          />
          <FeatureCard
            icon={video}
            title="Join Consultation"
            description=""
            pressable
            onPress={() => router.replace("/tabs/consultation")}
          />
          <FeatureCard
            icon={testTube}
            title="Lab Results"
            description=""
            pressable
            onPress={() => router.replace("/tabs/records")}
          />
          <FeatureCard
            icon={prescription}
            title="Prescription"
            description=""
            pressable
            onPress={() => router.replace("/tabs/records")}
          />
        </View>

        {/* Sections */}
        <AppointmentSection
          title="Upcoming appointments"
          emptyMessage="No upcoming appointments"
        />
        <AppointmentSection
          title="Recent prescription"
          emptyMessage="No recent prescriptions"
        />

        {/* Health Tips */}
        <View style={{ marginTop: 30 }}>
          <HealthTips />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 6,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  avatarFallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  welcomeSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  summaryLabel: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  healthTips: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  tip: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});

export default Dashboard;
