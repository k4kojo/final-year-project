import Colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import React from "react";

import TopHeader from "@/components/top-header.component";

export default function TabsLayout() {
  return (
    <>
      <TopHeader
        leftIconName="menu"
        rightIconName="bell-outline"
        iconColor="#fff"
        iconSize={28}
        onLeftPress={() => console.log("Menu pressed")}
        onRightPress={() => console.log("Bell pressed")}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "#828282",
          tabBarStyle: {
            backgroundColor: "#eeeeee",
            height: 100,
            paddingBottom: 20,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: "Appointment",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "calendar-blank" : "calendar-blank-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="consultation"
          options={{
            title: "Consult",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "video" : "video-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "folder" : "folder-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "account-circle" : "account-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
