import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button.component";
import Divider from "@/components/divider.component";
import TextInputField from "@/components/inputs/textInputField.component";

import { signInUser } from "@/utils/authService";
import { validateAuth } from "@/utils/validateAuth";

const SignInForm = () => {
  const router = useRouter();

  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const rawErrors = validateAuth({ email, password }, "signin");
    const newErrors = {
      email: rawErrors.email ?? "",
      password: rawErrors.password ?? "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    try {
      setLoading(true);
      const result = await signInUser(email, password);

      if (!result.success) {
        alert("Sign in failed: " + result.error);
        return;
      }

      console.log("Signed in:", result.user);
      console.log("User data from Firestore:", result.userData);

      router.push("/(tabs)");
    } catch (err: any) {
      alert("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      <TextInputField
        placeholder="email@example.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        error={errors.email}
      />

      <TextInputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        error={errors.password}
      />

      <Button
        title={loading ? "Signing in..." : "Sign in"}
        onPress={handleSubmit}
        disabled={loading}
      />

      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => router.push("/(forgot)/index")}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Divider />

      <Button
        icon={googleLogo}
        title=" Continue with Google"
        onPress={() => console.log("Google login")}
        plain
        style={styles.oauthButton}
      />
      <Button
        icon={appleLogo}
        title=" Continue with Apple"
        onPress={() => console.log("Apple login")}
        plain
        style={styles.oauthButton}
      />

      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/sign-up")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  oauthButton: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 13,
    marginTop: 20,
    color: "#444",
  },
  link: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
