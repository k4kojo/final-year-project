import Button from "@/components/button.component";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerifyCodeScreen() {
  const CODE_LENGTH = 4;
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (index < CODE_LENGTH - 1) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleBackspace = (index: number) => {
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </Pressable>

      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        Please enter the code we just sent to phone{"\n"}
        number (+1) 234 567 XXX
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            ref={(ref) => {
              inputs.current[idx] = ref;
            }}
            onChangeText={(value) => handleChange(value, idx)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" && handleBackspace(idx)
            }
            style={[styles.otpInput, digit ? styles.filledCircle : null]}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Resend code in{" "}
        <Text style={{ fontWeight: "bold" }}>
          00:{String(timer).padStart(2, "0")}
        </Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={() => {
            if (code.join("").length === CODE_LENGTH) {
              router.push("/accountRecovery/resetPassword");
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  filledCircle: {
    borderColor: "#2563eb",
  },
  resendText: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 60,
    fontSize: 16,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
});
