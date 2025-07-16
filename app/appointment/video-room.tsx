import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VideoCallScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
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
    router.back(); // Adjust to your route
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
          <TouchableOpacity onPress={() => setShowChat(!showChat)}>
            {showChat ? (
              <Ionicons name="chatbubble" size={22} color="#fff" />
            ) : (
              <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => null}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Section */}
      <View style={styles.videoContainer}>
        <View style={styles.remoteVideo}>
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
        <View style={styles.localVideo}>
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

      {/* Chat Section - Only when toggled */}
      {showChat && (
        <ScrollView style={styles.chatBox}>
          {chatMessages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.chatBubble,
                msg.isDoctor ? styles.doctorBubble : styles.userBubble,
              ]}
            >
              <Text style={styles.chatText}>{msg.sender}</Text>
              <Text style={styles.chatText}>{msg.text}</Text>
            </View>
          ))}
          {/* Input */}
          <View style={styles.chatInputRow}>
            <TextInput
              value={chatMessage}
              onChangeText={setChatMessage}
              placeholder="Type a message"
              placeholderTextColor="#ccc"
              style={styles.chatInput}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send" size={22} color="#10b981" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Control Buttons */}
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
          style={[styles.controlBtn, { backgroundColor: Colors.error }]}
        >
          <Ionicons name="call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937", // gray-800
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.accentDark,
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
    backgroundColor: Colors.tertiary,
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
  chatBox: {
    minHeight: 200,
    maxHeight: 240,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.accentDark,
  },
  chatBubble: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 10,
    borderRadius: 8,
  },
  doctorBubble: {
    backgroundColor: "#374151",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#10b981",
    alignSelf: "flex-end",
  },
  chatText: {
    color: "#fff",
    fontSize: 14,
  },
  chatInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: "#fff",
    height: 40,
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
