import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to PawPal!</Text>
            <Text style={styles.subtitle}>Your AI-powered pet care assistant</Text>
            <Text style={styles.description}>
                Start exploring the app to provide the best care for your pets.
            </Text>

            <View style={styles.loginContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.showButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.showButtonText}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={() => alert('Login pressed')} />
                </View>
            </View>
            <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>New User?</Text>
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
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
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    loginContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 50,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputPassword: {
        flex: 1,
        height: 40,
    },
    showButton: {
        padding: 5,
    },
    showButtonText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
    },
});
