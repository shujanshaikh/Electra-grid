import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Search, Filter, Star, Navigation2 } from 'lucide-react-native';
import { BACKEND_URL } from '@/config';
import axios from 'axios';

interface EVChargingStation {
  id: string | number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  powerCapacity: number;
  availability: boolean;
  imageUrl: string;
}

export default function StationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stations, setStations] = useState<EVChargingStation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/stations`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API Response:", response.data); 
      if (response.data && response.data.evStation) {
        const stationsData = Array.isArray(response.data.evStation) 
          ? response.data.evStation 
          : [response.data.evStation];
          
        setStations(stationsData as EVChargingStation[]);
      } else {
        console.error("Unexpected API response:", response.data);
        setStations([]);
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
      Alert.alert("Error", "Failed to fetch charging stations");
      setStations([]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search charging stations...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <ScrollView style={styles.stationList}>
          {stations.map((station, index) => (
            <TouchableOpacity 
              key={station.id || `station-${index}`} 
              style={styles.stationCard}
            >
              <View style={styles.stationImageContainer}>
                <Image 
                  source={{ uri: station.imageUrl }} 
                  style={styles.stationImage}
                />
              </View>
              
              <View style={styles.stationInfo}>
                <Text style={styles.stationName}>{station.name || 'Unnamed Station'}</Text>
                <Text style={styles.stationAddress}>{station.location || 'No location provided'}</Text>
                 
                <View style={styles.stationStats}>
                  <View style={styles.statItem}>
                    <Star size={16} color="#FF9500" />
                    <Text style={styles.statText}>{station.powerCapacity || '0'} kW</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.availableText, { color: station.availability ? "#34C759" : "#FF3B30" }]}>
                      {station.availability ? "Available" : "Occupied"}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Navigation2 size={16} color="#666" />
                    <Text style={styles.statText}>{station.latitude || '0'}° N</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {stations.length === 0 && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No charging stations found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { padding: 16, flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  searchContainer: { flex: 1, height: 40, backgroundColor: '#F2F2F7', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  searchIcon: { marginRight: 8 },
  searchPlaceholder: { color: '#666', fontSize: 16, fontFamily: 'Inter-Regular' },
  filterButton: { width: 40, height: 40, backgroundColor: '#F2F2F7', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  loader: { marginTop: 20 },
  stationList: { padding: 16 },
  stationCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  stationImage: { width: '100%', height: 160 },
  stationInfo: { padding: 16 },
  stationName: { fontSize: 18, fontFamily: 'Inter-SemiBold', marginBottom: 4 },
  stationAddress: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#666', marginBottom: 12 },
  stationStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#666' },
  availableText: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  stationImageContainer: { width: '100%', height: 160 },
  emptyState: { alignItems: 'center', justifyContent: 'center', height: 200 },
  emptyStateText: { fontSize: 16, color: '#666', fontFamily: 'Inter-Regular' },
});