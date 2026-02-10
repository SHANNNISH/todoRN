import { ITodo } from "@/types"; // Проверь, чтобы путь был верным
import { useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [task, setTask] = useState<string>("");

  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTask = () => {
    if (task.trim().length === 0) return;

    const newTodo: ITodo = {
      id: Date.now().toString(),
      title: task,
      isDone: false,
      priority: "Medium",
    };
    Keyboard.dismiss();
    setTodos([newTodo, ...todos]);
    setTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Dev Tasks</Text>

      {/* 1. ДОБАВЛЯЕМ ВЫВОД СПИСКА */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: "#fff", fontSize: 18 }}>{item.title}</Text>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="New task"
          placeholderTextColor="#666"
          value={task}
          onChangeText={setTask}
        />
        {/* 2. ПРИВЯЗЫВАЕМ ФУНКЦИЮ */}
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
  },
  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  inputWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: "#00FF41",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#FF3B30", // Красный "Apple" цвет
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteBtnText: { color: "#fff", fontWeight: "bold" },
  addBtnText: { fontSize: 30, fontWeight: "bold", color: "#000" },
});
