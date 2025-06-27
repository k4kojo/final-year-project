import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

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
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
        autoCapitalize="words"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});
