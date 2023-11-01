import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Fallback from "../components/Fallback";

const dummyData = [
  {
    id: "01",
    title: "Wash car",
  },
  {
    id: "02",
    title: "Read a book",
  },
];

const TodoScreen = () => {
  // Init local states
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  // Add todo function
  function handleAddTodo() {
    if (!todo.trim().length) {
      return;
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  }

  // Delete todo function
  function handleDeleteTodo(id) {
    const updatedTodo = todoList.filter((el) => el.id != id);
    setTodoList(updatedTodo);
  }

  function handleEdit(todo) {
    setEditedTodo(todo);
    setTodo(todo.title);
  }

  // handle updpate
  function handleUpdateTodo() {
    const updatedTodos = todoList.map((item) => {
      if (item.id == editedTodo.id) {
        return { ...item, title: todo };
      }
      return item

    });
    setTodoList(updatedTodos)
    setEditedTodo(null)
    setTodo('')
  }

  // Render todo
  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 9,
          paddingVertical: 10,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          //   elevation : for android
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}
        >
          {item.title}
        </Text>
        <View style={{ flexDirection: "row", gap: 30, paddingRight: 20 }}>
          <Ionicons
            name="pencil"
            size={23}
            color={"#fff"}
            onPress={() => handleEdit(item)}
          />
          <Ionicons
            name="trash"
            size={25}
            color={"#fff"}
            onPress={() => handleDeleteTodo(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 45 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}
      {/* Render todo list */}

      <FlatList data={todoList} renderItem={renderTodos} />
      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
