// components/NotificationScreen.tsx
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationScreen = () => {
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];

  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New Message from Dr. Smith",
      message: "Your test results are ready for review",
      timestamp: "2h ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Johnson is tomorrow at 2:00 PM",
      timestamp: "1d ago",
      read: true,
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      message: "New features available in the latest version",
      timestamp: "3d ago",
      read: true,
    },
    {
      id: 4,
      type: "message",
      title: "Lab Results Available",
      message: "Your blood work results are ready",
      timestamp: "Yesterday",
      read: false,
    },
  ];

  // Group notifications by date
  const groupedNotifications = [
    {
      date: "Today",
      items: notifications.filter((n) => n.timestamp === "2h ago"),
    },
    {
      date: "Yesterday",
      items: notifications.filter((n) => n.timestamp === "Yesterday"),
    },
    {
      date: "Older",
      items: notifications.filter(
        (n) => !["2h ago", "Yesterday"].includes(n.timestamp)
      ),
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return "chatbubble-outline";
      case "alert":
        return "alert-circle-outline";
      case "system":
        return "information-circle-outline";
      default:
        return "notifications-outline";
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
        paddingTop: 40,
      }}
    >
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Notifications
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        {groupedNotifications.map((group) => (
          <View key={group.date}>
            <Text style={[styles.dateHeader, { color: themeColors.subText }]}>
              {group.date}
            </Text>
            {group.items.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  {
                    backgroundColor: notification.read
                      ? "transparent"
                      : themeColors.card,
                    borderLeftColor: Colors.brand.primary,
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={getIcon(notification.type)}
                    size={20}
                    color={Colors.brand.primary}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={[styles.title, { color: themeColors.text }]}>
                    {notification.title}
                  </Text>
                  <Text
                    style={[styles.message, { color: themeColors.subText }]}
                  >
                    {notification.message}
                  </Text>
                </View>
                <Text
                  style={[styles.timestamp, { color: themeColors.subText }]}
                >
                  {notification.timestamp}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    padding: 16,
  },
  dateHeader: {
    fontSize: 14,
    marginVertical: 16,
    textTransform: "uppercase",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 8,
  },
});

export default NotificationScreen;
