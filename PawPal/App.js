// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; // Adjust the path according to your structure

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}