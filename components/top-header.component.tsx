import Colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  leftIconName?: string;
  rightIconName?: string;
  title?: string;
  iconColor?: string;
  iconSize?: number;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export default function TopHeader({
  leftIconName,
  rightIconName,
  title,
  iconColor = "#fff",
  iconSize = 24,
  onLeftPress,
  onRightPress,
}: Props) {
  return (
    <View style={styles.topHeader}>
      <View style={styles.leftSection}>
        {leftIconName && (
          <TouchableOpacity onPress={onLeftPress}>
            <MaterialCommunityIcons
              name={leftIconName as any}
              size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {rightIconName && (
        <TouchableOpacity onPress={onRightPress}>
          <MaterialCommunityIcons
            name={rightIconName as any}
            size={iconSize}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "18%",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: Colors.primary,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
