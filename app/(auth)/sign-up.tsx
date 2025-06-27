// Imports
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Localization from "expo-localization";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import Button from "@/components/button.component";
import Colors from "@/constants/colors";

// SignUp component for user registration
const SignUp = () => {
  // OAuth logo assets
  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  // Navigation
  const router = useRouter();
  // Agreement checkbox state
  const [agree, setAgree] = useState(false);

  // Form field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Phone input ref and country code
  const phoneInput = useRef<PhoneInput>(null);
  const PhoneInputComponent = PhoneInput as any;
  const countryCode = Localization.getLocales()[0]?.countryCode ?? "GH";

  // Date picker state
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
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  // Handle date selction
  interface DateChangeEvent {
    type: "set" | "dismissed" | string;
  }

  const handleDateChange = (
    event: DateChangeEvent,
    selectedDate?: Date | undefined
  ): void => {
    if (event.type === "set") {
      const currentDate = selectedDate as Date;
      setDate(currentDate);
    } else {
      toggleDatePicker();
    }
  };

  // Confirm and display slected date
  const confirmDate = () => {
    setDateOfBirth(date.toLocaleDateString());
    toggleDatePicker();
  };

  // Form submission with validation
  const handleErrorMessage = () => {
    const newErrors = {
      fullName: fullName ? "" : "Full name is required",
      email: email.includes("@") ? "" : "Enter a valid email",
      phoneNumber: phoneInput.current?.isValidNumber(phoneNumber)
        ? ""
        : "Invalid phone number",
      password:
        password.length >= 6 ? "" : "Password must be at least 6 characters",
      confirmPassword:
        confirmPassword === password ? "" : "Passwords do not match",
      dateOfBirth: dateOfBirth ? "" : "Date of birth is required",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    router.push("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {Title and subtitle} */}
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      {/* Full name input */}
      <TextInput
        placeholder="Full name"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName ? (
        <Text style={styles.errorText}>{errors.fullName}</Text>
      ) : null}

      {/* Email input */}
      <TextInput
        placeholder="email@example.com"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      {/* Date of birth */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={{ height: 120, marginTop: -10 }}
          textColor="#000"
          minimumDate={new Date(1900, 0, 1)} // Set minimum date to January 1, 1900
          maximumDate={new Date()} // Set maximum date to today
        />
      )}

      {showDatePicker && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={toggleDatePicker}>
            <Text style={styles.pickerButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDate}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 16,
                paddingHorizontal: 20,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!showDatePicker && (
        <Pressable onPress={toggleDatePicker} style={{ width: "100%" }}>
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor={Colors.placeholder}
            style={styles.input}
            value={dateOfBirth}
            onFocus={() => setShowDatePicker(true)}
            onChangeText={setDateOfBirth}
            editable={false}
            onPressIn={toggleDatePicker} // Open date picker on press
          />
        </Pressable>
      )}
      {errors.dateOfBirth ? (
        <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
      ) : null}

      {/* Phone number */}
      <PhoneInputComponent
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode={countryCode} // Default to Ghana; change as needed
        layout="first"
        onChangeFormattedText={(text: string) => {
          setPhoneNumber(text);
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        textInputProps={{
          placeholder: "Phone number",
          placeholderTextColor: "#999",
        }}
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      {/* Password */}
      <TextInput
        placeholder="Create password"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        secureTextEntry
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      {/* Confirm password */}
      <TextInput
        placeholder="Confirm password"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (errors.confirmPassword)
            setErrors({ ...errors, confirmPassword: "" });
        }}
        secureTextEntry
      />
      {errors.confirmPassword ? (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      ) : null}

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

      {/* Submit button */}
      <Button
        title="Sign up"
        onPress={handleErrorMessage}
        disabled={!agree}
        style={
          !agree
            ? { ...styles.signUpButton, ...styles.disabledButton }
            : styles.signUpButton
        }
        textStyle={!agree ? styles.disabledText : undefined}
      />

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
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
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  pickerButton: {
    color: Colors.primary,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  phoneContainer: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "transparent",
  },
  textInput: {
    backgroundColor: "transparent",
    paddingVertical: 0,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
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
