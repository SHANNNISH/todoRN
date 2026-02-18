import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 1. Цвета: Неоновый синий на глубоком черном
        tabBarActiveTintColor: "#fffb00",
        tabBarInactiveTintColor: "#636366",

        // 2. Нижняя панель
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 1,
          borderTopColor: "#1C1C1E", // Едва заметная граница
          height: Platform.OS === "ios" ? 88 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
        },

        // 3. Шапка (Header)
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTitleStyle: {
          fontWeight: "900",
          fontSize: 22,
          color: "#FFFFFF",
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="check-square" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="line-chart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
