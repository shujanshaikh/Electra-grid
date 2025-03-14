import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "expo-router";

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, { email, password, name });
      Alert.alert("Success", "Account created successfully");
      console.log("Acccount created", response.data);
    } catch (error) {
      Alert.alert("Error", "Signup failed");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
    router.push("/chat");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? "Signing Up..." : "Sign Up"} onPress={handleSignup} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 10 },
});

export default SignupScreen;