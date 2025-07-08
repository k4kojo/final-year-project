import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SettingItem = ({
  icon,
  label,
  caption,
  onPress,
  color,
}: {
  icon: any;
  label: string;
  caption?: string;
  onPress?: () => void;
  color?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingItem}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.itemLabel}>{label}</Text>
        {!!caption && <Text style={styles.itemCaption}>{caption}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemCaption: {
    fontSize: 12,
    color: "#888",
  },
});

export default SettingItem;
