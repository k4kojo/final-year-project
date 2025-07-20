import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import {
  getCurrentUserProfile,
  updateUserProfile,
} from "@/firebase/authService";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditAccountScreen() {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];

  const [form, setForm] = useState({
    nationalId: "",
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "", // as string
    gender: "",
    phoneNumber: "",
    email: "",
    city: "",
    province: "",
    address: "",
  });

  const [rawDate, setRawDate] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      const profile = await getCurrentUserProfile();
      if (profile) {
        setForm({
          nationalId: profile.nationalId ?? "",
          username: profile.username ?? "",
          firstName: profile.firstName ?? "",
          lastName: profile.lastName ?? "",
          dateOfBirth: profile.dateOfBirth ?? "",
          gender: profile.gender ?? "",
          phoneNumber: profile.phoneNumber ?? "",
          email: profile.email ?? "",
          city: profile.city ?? "",
          province: profile.province ?? "",
          address: profile.address ?? "",
        });

        if (profile.dateOfBirth) {
          const parts = profile.dateOfBirth.split("-");
          if (parts.length === 3) {
            setRawDate(new Date(profile.dateOfBirth));
          }
        }
      }
    })();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (value: string) => {
    handleChange("gender", value);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      const display = new Date(formatted).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      handleChange("dateOfBirth", display); // Display value
      setRawDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    const res = await updateUserProfile(form);
    if (res.success) {
      Alert.alert("Success", "Profile updated", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", res.error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Account</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Personal Info */}
      <Text style={styles.sectionTitle}>Personal</Text>

      <View style={styles.readOnlyField}>
        <Text style={styles.readOnlyLabel}>National ID</Text>
        <CustomInput
          value={form.nationalId}
          onChangeText={(text) => handleChange("nationalId", text)}
        />
      </View>

      <CustomInput
        label="Username"
        value={form.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <CustomInput
        label="First Name"
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <CustomInput
        label="Last Name"
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />

      {/* Date of Birth */}
      <CustomInput
        label="Date of Birth"
        value={form.dateOfBirth}
        editable={false}
        icon={
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar-outline" size={20} color="#999" />
          </TouchableOpacity>
        }
      />
      {showDatePicker && (
        <DateTimePicker
          value={rawDate ?? new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <GenderOption
          label="Female"
          selected={form.gender === "Female"}
          onPress={() => handleGenderSelect("Female")}
        />
        <GenderOption
          label="Male"
          selected={form.gender === "Male"}
          onPress={() => handleGenderSelect("Male")}
        />
      </View>

      {/* Contact Info */}
      <Text style={styles.sectionTitle}>Contact</Text>

      {/* Phone */}
      <View style={styles.iconInput}>
        <Ionicons name="flag" size={20} color="red" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Type your phone number"
          value={form.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
        />
      </View>

      {/* Email */}
      <View style={styles.iconInput}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#333"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>

      <CustomInput
        label="City"
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <CustomInput
        label="Province"
        value={form.province}
        onChangeText={(text) => handleChange("province", text)}
      />
      <CustomInput
        label="Address"
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  editable = true,
  icon,
}: {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  icon?: React.ReactNode;
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, !editable && styles.disabledInput]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={`Enter ${label}`}
      />
      {icon}
    </View>
  </View>
);

const GenderOption = ({
  label,
  selected,
  onPress,
}: {
  label: "Male" | "Female";
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.genderOption} onPress={onPress}>
    <Ionicons
      name={selected ? "radio-button-on" : "radio-button-off"}
      size={18}
      color={selected ? "#2563eb" : "#ccc"}
    />
    <Text style={styles.genderText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280", // Tailwind gray-500
    marginTop: 20,
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: "#111",
  },
  disabledInput: {
    color: "#666",
  },
  readOnlyField: {
    padding: 14,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    marginBottom: 16,
  },
  readOnlyLabel: {
    fontSize: 12,
    color: "#777",
  },
  readOnlyValue: {
    fontWeight: "600",
    fontSize: 15,
    color: "#111",
    marginTop: 2,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    paddingVertical: 4,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#111",
  },
  iconInput: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 18,
  },
  inputIcon: {
    marginRight: 8,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 50,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
