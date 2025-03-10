import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, TextInput, Alert } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "@/config";

const EnergyScreen = () => {
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [energyUsed, setEnergyUsed] = useState("");
  const [userId, setUserId] = useState("");
  const [stationId, setStationId] = useState("");

  // Fetch energy usage data
  const fetchEnergyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/energy` , 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEnergyData(response.data.energy);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch energy data");
    }
    setLoading(false);
  };

  // Add new energy usage record
  const addEnergyUsage = async () => {
    if (!userId || !stationId || !energyUsed) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/energy`,  {
        userId: parseInt(userId),
        stationId: parseInt(stationId),
        energyUsed: parseInt(energyUsed)
      } , 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.alert("Success", "Energy usage added successfully!");
      fetchEnergyData(); // Refresh list
    } catch (error) {
      Alert.alert("Error", "Failed to add energy usage");
    }
  };

  // Fetch single energy record (optional)
  const fetchEnergyById = async (id: number) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/energy/${id}`);
      Alert.alert("Energy Usage", JSON.stringify(response.data.energy, null, 2));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch energy record");
    }
  };

  useEffect(() => {
    fetchEnergyData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Energy Usage Data</Text>

      {loading ? <ActivityIndicator size="large" color="blue" /> : (
        <FlatList
          data={energyData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>User: {item.user.name}</Text>
              <Text>Station: {item.station.name}</Text>
              <Text>Energy Used: {item.energyUsed} kWh</Text>
              <Button title="View Details" onPress={() => fetchEnergyById(item.id)} />
            </View>
          )}
        />
      )}

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Add Energy Usage</Text>
      <TextInput placeholder="User ID" keyboardType="numeric" onChangeText={setUserId} style={inputStyle} />
      <TextInput placeholder="Station ID" keyboardType="numeric" onChangeText={setStationId} style={inputStyle} />
      <TextInput placeholder="Energy Used (kWh)" keyboardType="numeric" onChangeText={setEnergyUsed} style={inputStyle} />
      <Button title="Submit" onPress={addEnergyUsage} />
    </View>
  );
};

const inputStyle = {
  borderWidth: 1,
  padding: 10,
  marginBottom: 10,
};

export default EnergyScreen;
