import Button from "@/components/button.component";
import DoctorCard from "@/components/doctor-card";
import TopHeader from "@/components/top-header.component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<any>(null);

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brandColors = Colors.brand;

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

  const handleJoinCall = (appt: any) => {
    setActiveAppointment(appt);
    setModalVisible(true);
  };

  const handleConfirmCall = () => {
    setModalVisible(false);
    router.push("/appointment/video-room");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <TopHeader screen="appointments" />

      {/* Tabs */}
      <View
        style={[styles.tabContainer, { backgroundColor: themeColors.subCard }]}
      >
        {["upcoming", "past"].map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: brandColors.primary },
            ]}
            onPress={() => setSelectedTab(tab as "upcoming" | "past")}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? "#fff" : themeColors.text },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.appointmentCardContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        {mockAppointments[selectedTab].map((appt) => (
          <DoctorCard
            key={appt.id}
            {...appt}
            onJoinCall={() => handleJoinCall(appt)}
            onChat={() => router.push("/appointment/chat")}
          />
        ))}

        <View style={{ marginTop: 20 }}>
          <Button
            title="Book appointment"
            onPress={() => router.push("/appointment/schedule")}
          />
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: themeColors.card }]}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {activeAppointment?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </Text>
            </View>

            <Text style={[styles.modalDoctorName, { color: themeColors.text }]}>
              {activeAppointment?.name}
            </Text>
            <View style={styles.modalRow}>
              <Ionicons
                name="time-outline"
                size={18}
                color={themeColors.subText}
              />
              <Text style={[styles.modalText, { color: themeColors.subText }]}>
                {activeAppointment?.time}
              </Text>
              <Ionicons
                name="videocam-outline"
                size={18}
                color={themeColors.subText}
                style={{ marginLeft: 8 }}
              />
              <Text style={[styles.modalText, { color: themeColors.subText }]}>
                Video Call
              </Text>
            </View>

            <Text style={[styles.modalMessage, { color: themeColors.text }]}>
              Ready to start your video consultation?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.startBtn,
                  { backgroundColor: brandColors.secondary },
                ]}
                onPress={handleConfirmCall}
              >
                <Ionicons name="videocam" size={18} color="#fff" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  { backgroundColor: themeColors.border },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.cancelText, { color: themeColors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
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
    fontWeight: "600",
  },
  appointmentCardContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 10,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  modalDoctorName: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalText: {
    marginLeft: 4,
    fontSize: 14,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 22,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  startText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  cancelBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});
