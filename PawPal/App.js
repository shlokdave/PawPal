import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Display a custom welcome message */}
      <Text style={styles.title}>Welcome to PawPal!</Text>
      <Text style={styles.subtitle}>Your AI-powered pet care assistant</Text>
      <Text style={styles.description}>Start exploring the app to provide the best care for your pets.</Text>

      {/* Display the status bar */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light grey background for better contrast
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Add padding for better layout on web
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark grey text color
    marginBottom: 10, // Space below the title
  },
  subtitle: {
    fontSize: 20,
    color: '#555', // Medium grey text color
    marginBottom: 20, // Space below the subtitle
  },
  description: {
    fontSize: 16,
    color: '#666', // Lighter grey text color
    textAlign: 'center', // Center align text for better readability
  },
});
