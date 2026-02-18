import { useAppStore } from "@/src/store/useWeatherStore";
import { WeatherData } from "@/types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WeatherScreen() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { lastCity } = useAppStore();

  const API_KEY = "98ea1fa633f83f3d7565c7c8d9a457d5";

  const fetchWeather = () => {
    setData(null);
    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${lastCity}&units=metric&lang=ru&appid=${API_KEY}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData({
          temp: json.main.temp,
          desc: json.weather[0].description,
          city: json.name,
        });
      })
      .catch((err) => {
        if (err.message === "Ошибка: 401") {
          setError("Что-то пошло не так");
        } else {
          setError("Ошибка сети");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (lastCity) {
      fetchWeather();
    }
  }, [lastCity]);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lastCity} Weather</Text>

      {error ? (
        <View style={styles.card}>
          <Text
            style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
          >
            {error}
          </Text>
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>ПОВТОРИТЬ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          {data && (
            <>
              <Text style={styles.temp}>{data.temp}°C</Text>
              <Text style={styles.desc}>{data.desc}</Text>
              <Text style={styles.city}>{data.city}</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "900", color: "#fff", marginBottom: 30 },
  card: {
    backgroundColor: "#1c1c1e",
    padding: 40,
    borderRadius: 24,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  temp: { fontSize: 80, fontWeight: "bold", color: "#0A84FF" },
  desc: {
    fontSize: 22,
    color: "#fff",
    marginTop: 10,
    textTransform: "capitalize",
    textAlign: "center",
  },
  city: { fontSize: 18, color: "#666", marginTop: 15 },
  button: {
    marginTop: 20,
    backgroundColor: "#0A84FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
});
