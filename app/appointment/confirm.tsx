import StepHeader from "@/components/step-header-component";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ConfirmScreen = () => {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const { initials, name, specialty, date, time, consultationType, fee } =
    useLocalSearchParams();

  const consultationFee = Number(fee) || 0;
  const platformFee = 10.0;
  const total = consultationFee + platformFee;

  console.log(typeof fee);

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert("Please choose a payment method");
      return;
    }

    router.replace("/appointment/success");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <StepHeader step={3} />

      {/* Row layout */}
      <View style={styles.rowWrap}>
        {/* Appointment Details */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Appointment Details</Text>
          <View style={styles.docRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {initials?.toString() ?? "Dr"}
              </Text>
            </View>
            <View>
              <Text style={styles.docName}>{name ?? "Doctor Name"}</Text>
              <Text style={styles.grayText}>{specialty ?? "Specialty"}</Text>
            </View>
          </View>

          <View style={styles.iconRow}>
            <Ionicons name="calendar-outline" size={16} />
            <Text style={styles.rowText}>
              {date ? new Date(date.toString()).toDateString() : "Date"}
            </Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="time-outline" size={16} />
            <Text style={styles.rowText}>{time ?? "Time"}</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="person-outline" size={16} />
            <Text style={styles.rowText}>
              {consultationType === "In-Person"
                ? "In-Person Visit"
                : "Video Call"}
            </Text>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Payment Summary</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.grayText}>Consultation Fee</Text>
            <Text style={styles.feeText}>₵{consultationFee}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.grayText}>Platform Fee</Text>
            <Text style={styles.feeText}>₵{platformFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₵{total}</Text>
          </View>
        </View>
      </View>

      {/* Reason for Visit */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Reason for Visit</Text>
        <TextInput
          placeholder="Please describe your symptoms or reason for the appointment..."
          multiline
          style={styles.textArea}
          value={reason}
          onChangeText={setReason}
        />
      </View>

      {/* Payment Methods */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Payment Method</Text>
        <View style={styles.payOptions}>
          {["MTN MoMo", "Telecel Cash", "Credit/Debit Card"].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentBtn,
                selectedMethod === method && styles.paymentBtnSelected,
              ]}
              onPress={() => setSelectedMethod(method)}
            >
              <Ionicons
                name={
                  method === "Credit/Debit Card"
                    ? "card-outline"
                    : "phone-portrait-outline"
                }
                size={18}
                color={selectedMethod === method ? "#fff" : "#333"}
              />
              <Text
                style={[
                  styles.paymentBtnText,
                  selectedMethod === method && { color: "#fff" },
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Fields */}
        {selectedMethod === "MTN MoMo" || selectedMethod === "Telecel Cash" ? (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Money Number</Text>
            <TextInput
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        ) : null}

        {selectedMethod === "Credit/Debit Card" && (
          <View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.cardDetailsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Expiry</Text>
                <TextInput placeholder="MM/YY" style={styles.input} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  placeholder="123"
                  keyboardType="numeric"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleConfirm}>
        <Text style={styles.submitText}>Confirm & Pay ₵{total}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmScreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rowWrap: {
    gap: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "600",
    color: "#333",
  },
  docName: {
    fontWeight: "600",
    fontSize: 15,
  },
  grayText: {
    color: "#666",
    fontSize: 13,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 3,
  },
  rowText: {
    fontSize: 14,
    color: "#333",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
  feeText: {
    fontSize: 14,
    color: "#111",
  },
  totalText: {
    fontSize: 15,
    fontWeight: "600",
  },
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 14,
  },
  payOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  paymentBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  paymentBtnSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  paymentBtnText: {
    fontSize: 14,
    color: "#333",
  },
  inputGroup: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  cardDetailsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  submitBtn: {
    backgroundColor: "#000",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
