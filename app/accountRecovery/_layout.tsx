// app/forgot/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Reset Password" }} />
    </Stack>
  );
}
