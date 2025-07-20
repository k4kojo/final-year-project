import { ThemeProvider } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <ThemeProvider>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
