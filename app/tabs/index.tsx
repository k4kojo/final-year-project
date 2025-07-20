import QuickActionsSection from "@/components/dasboard/quickAction.component";
import SideMenu from "@/components/dasboard/side-menu.component";
import WelcomeCard from "@/components/dasboard/welcome-card.component";
import HealthTips from "@/components/health-tips.component";
import Section from "@/components/section.component";
import TopHeader from "@/components/top-header.component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Dashboard = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuSlide = useRef(new Animated.Value(width)).current;

  const { theme, toggleTheme } = useThemeContext();
  const themeColors = Colors[theme];
  const brandColors = Colors.brand;

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

      setProfileImage(imageUrl || null);
    } catch (error) {
      console.log("Error fetching profile:", error);
      setProfileImage(null);
    }
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuSlide, {
      toValue: width - width / 1.5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuSlide, {
      toValue: width,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <TopHeader
        screen="home"
        onLeftPress={openMenu}
        onRightPress={() => router.push("../notification")}
      />

      {/* Slide-in menu */}
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <SideMenu
            menuSlide={menuSlide}
            menuVisible={menuVisible}
            closeMenu={closeMenu}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        </Pressable>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: themeColors.background },
        ]}
      >
        <WelcomeCard
          profileImage={profileImage ?? undefined}
          themeColors={themeColors}
          brandColors={brandColors}
        />

        <QuickActionsSection themeColors={themeColors} />

        <Section
          title="Upcoming appointments"
          emptyMessage="No upcoming appointments"
          destination="/tabs/appointment"
        />
        <Section
          title="Recent prescription"
          emptyMessage="No recent prescriptions"
          destination="/tabs/records"
        />

        <View style={{ marginTop: 30 }}>
          <HealthTips />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 100,
  },
});
