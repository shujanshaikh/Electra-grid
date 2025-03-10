import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { User, Bell, Shield, CircleHelp as HelpCircle, ChevronRight, LogOut, Car, Zap } from 'lucide-react-native';

export default function SettingsScreen() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <User size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Profile Information</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Car size={20} color="#FF9500" />
            <Text style={styles.menuItemText}>Vehicle Settings</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Zap size={20} color="#34C759" />
            <Text style={styles.menuItemText}>Charging Preferences</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={20} color="#FF3B30" />
            <Text style={styles.menuItemText}>Push Notifications</Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Shield size={20} color="#5856D6" />
            <Text style={styles.menuItemText}>Privacy Settings</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 16,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 20,
    marginBottom: 40,
  },
});