import Colors from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "#828282",
          tabBarStyle: {
            backgroundColor: "#DADADA",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="house" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="consultation"
          options={{
            title: "Consult",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="video" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="file" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
