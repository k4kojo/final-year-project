import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/button.component";

const SignUp = () => {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      <TextInput
        placeholder="First name"
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Last name"
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="email@example.com"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Create password"
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm password"
        style={styles.input}
        secureTextEntry
      />

      {/* Custom checkbox with agreement */}
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={[styles.checkbox]}
          onPress={() => setAgree(!agree)}
        >
          {agree && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <Button
        title="Sign up"
        onPress={() => router.push("/(tabs)")}
        disabled={!agree}
        style={
          !agree
            ? { ...styles.signUpButton, ...styles.disabledButton }
            : styles.signUpButton
        }
        textStyle={!agree ? styles.disabledText : undefined}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        icon={googleLogo}
        title=" Sign up with Google"
        style={styles.oauthButton}
        onPress={() => console.log("/SignIn")}
        plain
      />
      <Button
        icon={appleLogo}
        title=" Sign up with Apple"
        style={styles.oauthButton}
        onPress={() => console.log("Apple Signed In")}
        plain
      />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
  },
  checkboxText: {
    fontSize: 12,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
  link: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
  },
  oauthButton: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  signUpButton: {
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledText: {
    color: "#888",
  },
});
