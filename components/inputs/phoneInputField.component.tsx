import Colors from "@/constants/colors";
import React, { RefObject } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View style={{ width: "100%" }}>
      <PhoneInputComponent
        ref={phoneInputRef}
        defaultValue={value}
        defaultCode={defaultCode}
        layout="first"
        onChangeFormattedText={(text: string) => setValue(text)}
        containerStyle={styles.container}
        textContainerStyle={styles.textContainer}
        codeTextStyle={styles.countryCodeText}
        textInputStyle={styles.inputText}
        textInputProps={{
          placeholder: "Phone number",
          placeholderTextColor: Colors.placeholder,
        }}
        flagButtonStyle={styles.flagButton}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 12,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  textContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1,
    justifyContent: "center",
  },
  flagButton: {
    // backgroundColor: "#f3f4f6",
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    // width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  inputText: {
    fontSize: 14,
    color: "#111827",
    paddingLeft: 0,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
