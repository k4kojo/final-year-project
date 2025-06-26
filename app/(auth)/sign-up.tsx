import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";

import Button from "@/components/button.component";
import Colors from "@/constants/colors";

const SignUp = () => {
  const appleLogo = require("@/assets/images/apple_logo.png");
  const googleLogo = require("@/assets/images/google_logo.png");

  const router = useRouter();
  const [agree, setAgree] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selected, setSelected] = useState("+233"); // Default country code
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

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

  const confirmDate = () => {
    setDateOfBirth(date.toLocaleDateString());
    toggleDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      <TextInput
        placeholder="Full name"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="email@example.com"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

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

      <View style={{ width: "100%", justifyContent: "space-between" }}>
        <CountryCodeDropdownPicker
          selected={selected}
          setSelected={setSelected}
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          style={styles.countryCodePicker}
        />
      </View>

      <TextInput
        placeholder="Create password"
        placeholderTextColor={Colors.placeholder}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirm password"
        placeholderTextColor={Colors.placeholder}
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
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  pickerButton: {
    color: Colors.primary,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
  },
  countryCodePicker: {
    width: "100%",
    marginBottom: 12,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
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
