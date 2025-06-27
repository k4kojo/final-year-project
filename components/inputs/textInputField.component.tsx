import Colors from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
};

export default function TextInputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const getKeyboardType = (): KeyboardTypeOptions => {
    if (placeholder.toLowerCase().includes("email")) return "email-address";
    if (placeholder.toLowerCase().includes("phone")) return "phone-pad";
    return "default";
  };

  const showToggle = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          style={[styles.input, showToggle && { paddingRight: 40 }]}
          value={value}
          keyboardType={getKeyboardType()}
          autoCapitalize="none"
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {showToggle && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <MaterialIcons
              name={isPasswordVisible ? "visibility-off" : "visibility"}
              size={22}
              color={Colors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 12,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },
});
