import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  show: boolean;
  date: Date;
  onToggle: () => void;
  onChange: (event: any, selectedDate?: Date) => void;
  onConfirm: () => void;
  displayDate: string;
  error?: string;
  inputStyles?: object;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

export default function DatePickerField({
  show,
  date,
  onToggle,
  onChange,
  onConfirm,
  displayDate,
  error,
  inputStyles,
  placeholder,
  minimumDate,
  maximumDate,
}: Props) {
  return (
    <View style={styles.container}>
      {show && (
        <>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            style={{ height: 120 }}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onToggle}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={styles.button}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {!show && (
        <Pressable onPress={onToggle}>
          <TextInput
            style={[styles.input, inputStyles]}
            value={displayDate || ""}
            placeholder={placeholder}
            placeholderTextColor="#999"
            editable={false}
            onPressIn={onToggle}
          />
        </Pressable>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    fontSize: 16,
    color: "#2563EB",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});
