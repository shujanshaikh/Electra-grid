import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "@/config";

const ChatScreen: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/chat`, { prompt: input });
      const botMessage = { role: "bot", content: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.role === "user" ? styles.user : styles.bot]}>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Button title={loading ? "Sending..." : "Send"} onPress={sendMessage} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  chatContainer: { flex: 1, marginBottom: 10 },
  message: { padding: 10, borderRadius: 10, marginVertical: 5 },
  user: { alignSelf: "flex-end", backgroundColor: "#0078fe" },
  bot: { alignSelf: "flex-start", backgroundColor: "#e5e5ea" },
  messageText: { color: "white" },
  input: { padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 5 },
});

export default ChatScreen;
