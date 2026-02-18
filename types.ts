export type Priority = "Low" | "Medium" | "High";

export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
  priority: Priority;
}

export interface WeatherData {
  temp: number;
  desc: string;
  city: string;
}

export interface AppState {
  lastCity: string;
  setLastCity: (city: string) => void;
}
