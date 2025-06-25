import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Link, useRouter } from "expo-router";

import Button from "@/components/button.component";
import { primaryColor } from "@/constants/colors";

const SignIn = () => {
  const router = useRouter();

  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      <TextInput
        placeholder="email@example.com"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput placeholder="password" style={styles.input} secureTextEntry />

      <Button title="Sign in" onPress={() => router.push("/(tabs)")} />

      <View style={styles.forgotContainer}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        icon={googleLogo}
        title=" Continue with Google"
        style={styles.oauthButton}
        onPress={() => console.log("Google login")}
        plain
      />
      <Button
        icon={appleLogo}
        title=" Continue with Apple"
        onPress={() => console.log("Apple_login")}
        plain
      />

      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Link href="/sign-up" style={styles.link}>
          Sign up
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    marginBottom: 22,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgot: {
    color: primaryColor,
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
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#444",
  },
  link: {
    color: primaryColor,
  },
});
