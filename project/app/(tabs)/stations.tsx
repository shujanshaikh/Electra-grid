import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Filter, Star, Navigation2 } from 'lucide-react-native';

const STATIONS = [
  {
    id: 1,
    name: 'Central Station EV Hub',
    address: '123 Main Street, Downtown',
    image: 'https://images.unsplash.com/photo-1697144518266-813f8f4b1363?q=80&w=1200',
    rating: 4.8,
    available: 3,
    distance: '0.8',
  },
  {
    id: 2,
    name: 'GreenCharge Plaza',
    address: '456 Park Avenue, Midtown',
    image: 'https://images.unsplash.com/photo-1647500660073-5d7f4a3a69ee?q=80&w=1200',
    rating: 4.5,
    available: 1,
    distance: '1.2',
  },
  {
    id: 3,
    name: 'EcoStation West',
    address: '789 West Street, Westside',
    image: 'https://images.unsplash.com/photo-1647500660101-8b7b31b77e0c?q=80&w=1200',
    rating: 4.7,
    available: 5,
    distance: '2.4',
  },
];

export default function StationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

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

      <ScrollView style={styles.stationList}>
        {STATIONS.map((station) => (
          <TouchableOpacity key={station.id} style={styles.stationCard}>
            <Image source={{ uri: station.image }} style={styles.stationImage} />
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>{station.name}</Text>
              <Text style={styles.stationAddress}>{station.address}</Text>
              
              <View style={styles.stationStats}>
                <View style={styles.statItem}>
                  <Star size={16} color="#FF9500" />
                  <Text style={styles.statText}>{station.rating}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.availableText}>{station.available} Available</Text>
                </View>
                <View style={styles.statItem}>
                  <Navigation2 size={16} color="#666" />
                  <Text style={styles.statText}>{station.distance} mi</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchContainer: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationList: {
    padding: 16,
  },
  stationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stationImage: {
    width: '100%',
    height: 160,
  },
  stationInfo: {
    padding: 16,
  },
  stationName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  stationAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 12,
  },
  stationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  availableText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#34C759',
  },
});