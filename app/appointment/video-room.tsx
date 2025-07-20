import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Get screen height for dynamic positioning
const { height: screenHeight } = Dimensions.get("window");

export default function VideoCallScreen() {
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];

  const navigation = useNavigation();
  const route = useRoute();

  // Assuming doctor info comes from route params or context
  const doctorName = "Dr. Kwame Asante"; // Replace with actual prop/param
  const doctorId = "doctor_kwame_asante_id"; // Replace with actual prop/param

  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false); // This will control the visibility of the internal chat UI
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "Dr. Kwame Asante",
      text: "Hello! Can you hear me?",
      isDoctor: true,
    },
  ]);

  const [notes, setNotes] = useState("");

  // New state to manage the minimized video view
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);

  // Simulate call connection state and timer
  useEffect(() => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);

    const timer = setInterval(() => {
      if (isConnected) setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isConnected]);

  // Use a navigation listener to know when ChatScreen is focused/unfocused
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      // When VideoCallScreen is focused, assume it's back from a pushed screen (like chat)
      // and we might want to maximize it again, or keep it minimized if explicitly left so
      // For this example, let's assume coming back means maximizing
      setIsVideoMinimized(false);
    });

    // You might also want a blur listener if you need to specifically minimize when leaving this screen
    // const unsubscribeBlur = navigation.addListener('blur', () => {
    //   // If navigating away, you might want to minimize the video automatically
    //   // setIsVideoMinimized(true);
    // });

    return () => {
      unsubscribeFocus();
      // unsubscribeBlur();
    };
  }, [navigation]);

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newChat = {
        id: Date.now().toString(),
        text: chatMessage,
        sender: "You",
        isDoctor: false,
      };
      setChatMessages((prev) => [...prev, newChat]);
      setChatMessage("");
    }
  };

  const handleEndCall = () => {
    // Navigate back to the previous screen (e.g., appointments list)
    router.back();
  };

  const navigateToChatAndMinimizeVideo = () => {
    setIsVideoMinimized(true); // Minimize current video view
    router.push({
      pathname: "./chat", // Use a relative path if chat-screen is a sibling route
      params: { doctorId: doctorId, doctorName: doctorName }, // Pass data to ChatScreen
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {!isVideoMinimized && ( // Hide header when minimized (optional)
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DA</Text>
            </View>
            <View>
              <Text style={styles.doctorName}>Dr. Kwame Asante</Text>
              <Text style={styles.status}>{formatDuration(callDuration)}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity onPress={navigateToChatAndMinimizeVideo}>
              {/* This icon will now trigger navigation to ChatScreen */}
              <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => null}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Video Section - Conditionally render full or minimized */}
      <View
        style={
          isVideoMinimized
            ? styles.minimizedVideoContainer
            : styles.videoContainer
        }
      >
        <View
          style={
            isVideoMinimized ? styles.minimizedRemoteVideo : styles.remoteVideo
          }
        >
          {/* Replace with video SDK surface */}
          <View style={[styles.videoMock, { backgroundColor: "#111" }]}>
            {!isConnected ? (
              <Text style={{ color: "#888", fontSize: 14 }}>
                Connecting to doctor...
              </Text>
            ) : (
              <Text style={{ color: "#fff" }}>Doctor Video Feed</Text>
            )}
          </View>
        </View>

        {/* Local video (PiP) */}
        <View
          style={
            isVideoMinimized ? styles.minimizedLocalVideo : styles.localVideo
          }
        >
          {isVideoEnabled ? (
            <View style={styles.videoMock}>
              <Text style={{ color: "#fff" }}>Self View</Text>
            </View>
          ) : (
            <View style={[styles.videoMock, { backgroundColor: "#555" }]}>
              <Text style={{ color: "#fff" }}>Camera Off</Text>
            </View>
          )}
        </View>
      </View>

      {/* Chat Section - Only when toggled (removed in favor of dedicated chat screen) */}
      {/* This internal chat UI will no longer be used */}
      {/* {showChat && ( ... )} */}

      {/* Control Buttons - Hide when video is minimized */}
      {!isVideoMinimized && (
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => setIsAudioEnabled(!isAudioEnabled)}
            style={styles.controlBtn}
          >
            <Ionicons
              name={isAudioEnabled ? "mic" : "mic-off"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVideoEnabled(!isVideoEnabled)}
            style={styles.controlBtn}
          >
            <Ionicons
              name={isVideoEnabled ? "videocam" : "videocam-off"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEndCall}
            style={[styles.controlBtn, { backgroundColor: themeColors.error }]}
          >
            <Ionicons name="call" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
  },
  header: {
    paddingTop: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.brand.accentDark,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  doctorName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    color: "#9ca3af",
    fontSize: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoContainer: {
    flex: 1,
    position: "relative",
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: "#000",
  },
  localVideo: {
    position: "absolute",
    right: 10,
    bottom: 100,
    width: 120,
    height: 90,
    backgroundColor: "#000",
    borderColor: "#4b5563",
    borderWidth: 1,
    borderRadius: 10,
  },
  videoMock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  minimizedVideoContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 50,
    right: 10,
    width: 180,
    height: 135,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
    borderColor: Colors.brand.accent,
    borderWidth: 2,
    zIndex: 100,
  },
  minimizedRemoteVideo: {
    flex: 1,
    backgroundColor: "#000",
  },
  minimizedLocalVideo: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 60,
    height: 45,
    backgroundColor: "#000",
    borderColor: "#4b5563",
    borderWidth: 1,
    borderRadius: 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 12,
    backgroundColor: "#1f2937",
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  controlBtn: {
    backgroundColor: "#4b5563",
    padding: 14,
    borderRadius: 50,
  },
});
