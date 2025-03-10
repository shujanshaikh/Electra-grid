import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "expo-router";

const SigninScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
   
  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
    
    
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signin`, { email, password });
      Alert.alert("Success", "Signed in successfully");
      console.log("Token:", response.data.token);
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? "Signing In..." : "Sign In"} onPress={handleSignin} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 10 },
});

export default SigninScreen;