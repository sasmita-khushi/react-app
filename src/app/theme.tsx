import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { ThemeContext } from "../context/user-context";

export default function Home() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <View
      className={`justify-center items-center flex-1 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Text
        className={`text-lg ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
      >
        Current Theme: {theme}
      </Text>

      <Pressable onPress={toggleTheme}>
        <Text className=" text-blue-500">Toggle Theme</Text>
      </Pressable>
    </View>
  );
}
