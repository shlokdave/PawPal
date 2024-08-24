// src/screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Display a custom welcome message */}
            <Text style={styles.title}>Welcome to PawPal!</Text>
            <Text style={styles.subtitle}>Your AI-powered pet care assistant</Text>
            <Text style={styles.description}>
                Start exploring the app to provide the best care for your pets.
            </Text>

            {/* Login Form */}
            <View style={styles.loginContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                />

                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={() => alert('Login pressed')} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
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
        marginBottom: 30, // Space below the description
    },
    loginContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9', // Light background for the form area
        borderRadius: 10, // Rounded corners for the form area
        shadowColor: '#000', // Shadow color for a subtle shadow effect
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 3, // Elevation for Android shadow
        marginBottom: 50, // Add space below the form
    },
    label: {
        fontSize: 16,
        color: '#333', // Dark grey text color
        marginBottom: 5, // Space below the label
    },
    input: {
        height: 40,
        borderColor: '#ccc', // Light grey border color
        borderWidth: 1,
        borderRadius: 5, // Rounded corners for the input field
        marginBottom: 20, // Space below the input field
        paddingHorizontal: 10, // Padding inside the input field
    },
    buttonContainer: {
        marginTop: 10, // Space above the button
    },
});
