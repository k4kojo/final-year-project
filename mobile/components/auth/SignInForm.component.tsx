import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button.component";
import Divider from "@/components/divider.component";
import TextInputField from "@/components/inputs/textInputField.component";

import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { validateAuth } from "@/firebase/validateAuth";

const SignInForm = () => {
  const router = useRouter();

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brandColors = Colors.brand;

  const googleLogo = require("@/assets/images/google_logo.png");
  const appleLogo = require("@/assets/images/apple_logo.png");

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
      // const result = await signInUser(email, password);

      // if (!result.success) {
      //   alert("Sign in failed: " + result.error);
      //   return;
      // }

      router.push("/tabs");
    } catch (err: any) {
      alert("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>Sign In</Text>
      <Text style={[styles.subtitle, { color: themeColors.subText }]}>
        Enter your email and password
      </Text>

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
        <TouchableOpacity onPress={() => router.push("/accountRecovery")}>
          <Text style={[styles.link, { color: brandColors.primary }]}>
            Forgot your password?
          </Text>
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

      <Text style={[styles.footerText, { color: themeColors.text }]}>
        Don’t have an account?{" "}
        <Text
          style={[styles.link, { color: brandColors.primary }]}
          onPress={() => router.push("/sign-up")}
        >
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
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
  oauthButton: {
    marginBottom: 10,
    width: "100%",
  },
  footerText: {
    fontSize: 15,
    marginTop: 20,
  },
  link: {
    fontWeight: "600",
  },
});
