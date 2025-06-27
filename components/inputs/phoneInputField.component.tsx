import React, { RefObject } from "react";
import { StyleSheet, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";

type Props = {
  phoneInputRef: RefObject<PhoneInput | null>;
  value: string;
  setValue: (val: string) => void;
  defaultCode: string;
  error?: string;
};

export default function PhoneInputField({
  phoneInputRef,
  value,
  setValue,
  defaultCode,
  error,
}: Props) {
  const PhoneInputComponent = PhoneInput as any;
  return (
    <>
      <PhoneInputComponent
        ref={phoneInputRef}
        defaultValue={value}
        defaultCode={defaultCode}
        layout="first"
        onChangeFormattedText={(text: string) => setValue(text)}
        containerStyle={styles.container}
        textContainerStyle={styles.textContainer}
        textInputProps={{
          placeholder: "Phone number",
          placeholderTextColor: "#999",
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "transparent",
  },
  textContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});
