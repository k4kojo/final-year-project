import * as Localization from "expo-localization";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import Button from "@/components/button.component";
import Divider from "../divider.component";
import DatePickerField from "../inputs/datePickerField.component";
import PhoneInputField from "../inputs/phoneInputField.component";
import TextInputField from "../inputs/textInputField.component";

import { validateAuth } from "@/utils/validateAuth";

const SignUpForm = () => {
  // OAuth logo assets
  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  // Navigation
  const router = useRouter();

  // Phone input ref and country code
  const PhoneInput = useRef<PhoneInput>(null);
  const countryCode = Localization.getLocales()[0]?.regionCode ?? "GH";

  // Agreement checkbox states
  const [agree, setAgree] = useState(false);

  // Form field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Error messages for form fields
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle date picker visibility
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  // Handle data selection
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set") {
      setDate(selectedDate || new Date());
    } else {
      toggleDatePicker();
    }
  };

  // Confirm and display selected date
  const confirmDate = () => {
    setDateOfBirth(date.toLocaleDateString());
    toggleDatePicker();
  };

  // Form submission with validation
  const handleSubmit = () => {
    const rawErrors = validateAuth(
      {
        fullName,
        email,
        phoneNumber,
        dateOfBirth,
        password,
        confirmPassword,
      },
      "signup"
    );

    // Ensure all error fields are strings
    const newErrors = {
      fullName: rawErrors.fullName ?? "",
      email: rawErrors.email ?? "",
      dateOfBirth: rawErrors.dateOfBirth ?? "",
      phoneNumber: rawErrors.phoneNumber ?? "",
      password: rawErrors.password ?? "",
      confirmPassword: rawErrors.confirmPassword ?? "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    router.push("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Fill out the form to get started</Text>

      <TextInputField
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
        error={errors.fullName}
      />

      <TextInputField
        placeholder="email@example.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        error={errors.email}
      />

      <DatePickerField
        show={showDatePicker}
        date={date}
        onToggle={toggleDatePicker}
        onChange={handleDateChange}
        onConfirm={confirmDate}
        displayDate={dateOfBirth}
        error={errors.dateOfBirth}
      />

      <PhoneInputField
        phoneInputRef={PhoneInput}
        value={phoneNumber}
        setValue={setPhoneNumber}
        defaultCode={countryCode}
        error={errors.phoneNumber}
      />

      <TextInputField
        placeholder="Create password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        secureTextEntry
        error={errors.password}
      />

      <TextInputField
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (errors.confirmPassword)
            setErrors({ ...errors, confirmPassword: "" });
        }}
        secureTextEntry
        error={errors.confirmPassword}
      />

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

      <Button title="Sign up" onPress={handleSubmit} disabled={!agree} />

      <Divider />

      {/* OAuth buttons */}
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

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    fontSize: 16,
    marginBottom: 20,
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
  oauthButton: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
  },
});
