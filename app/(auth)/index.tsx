import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Link, router } from "expo-router";

import Button from "@/components/button.component";
import FeatureCard from "@/components/feature-card.component";
import Colors from "@/constants/colors";

export default function Index() {
  const calender = require("@/assets/images/calender.png");
  const video = require("@/assets/images/video.png");
  const prescription = require("@/assets/images/medical.png");
  const shield = require("@/assets/images/shield.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>Welcome to Modern Healthcare</Text>
          <Text style={styles.sectionDescription}>
            Connect with doctors, book appointments, and manage your health
            records from anywhere in Ghana and beyond.
          </Text>
        </View>

        <View style={styles.grid}>
          <FeatureCard
            title="Video Consultations"
            description="Talk to doctors remotely"
            icon={video}
          />
          <FeatureCard
            title="Easy Booking"
            description="Schedule appointments"
            icon={calender}
          />
          <FeatureCard
            title="E-Prescriptions"
            description="Digital prescriptions"
            icon={prescription}
          />
          <FeatureCard
            title="Secure Records"
            description="Safe medical data"
            icon={shield}
          />
        </View>

        <View style={styles.whyBox}>
          <Text style={styles.sectionTitle}>Why Choose MediConnect?</Text>

          <View style={styles.bullet}>
            <Image
              source={require("@/assets/images/clock.png")}
              style={styles.bulletIcon}
            />
            <View>
              <Text style={styles.bulletTitle}>Save Time</Text>
              <Text style={styles.bulletSubtitle}>
                No more long queues and travel times
              </Text>
            </View>
          </View>

          <View style={styles.bullet}>
            <Text style={styles.bulletIcon}>🧑‍⚕️</Text>
            <View>
              <Text style={styles.bulletTitle}>Quality Care</Text>
              <Text style={styles.bulletSubtitle}>
                Connect with qualified doctors
              </Text>
            </View>
          </View>

          <View style={styles.bullet}>
            <Text style={styles.bulletIcon}>🔐</Text>
            <View>
              <Text style={styles.bulletTitle}>Privacy First</Text>
              <Text style={styles.bulletSubtitle}>
                Your health data is secure
              </Text>
            </View>
          </View>
        </View>

        <Button title="Get Started" onPress={() => router.push("/sign-in")} />

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/sign-in" style={styles.link}>
            Sign in
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  content: {
    width: "90%",
    paddingBottom: 30,
  },
  welcomeSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  sectionDescription: {
    textAlign: "center",
    color: "#555",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whyBox: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletIcon: {
    width: 30,
    height: 30,
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  bulletTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  bulletSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  footer: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
