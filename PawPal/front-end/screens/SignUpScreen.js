import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function SignUpScreen() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        const minLength = 7;
        const hasNumber = /\d/; // Regular expression to check for a digit
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Regular expression to check for special characters

        if (password.length < minLength) {
            return 'Password must be at least 7 characters long.';
        }
        if (!hasNumber.test(password)) {
            return 'Password must contain at least 1 number.';
        }
        if (!hasSpecialChar.test(password)) {
            return 'Password must contain at least 1 special character.';
        }
        return null;
    };

    const handleSignUp = () => {
        const passwordError = validatePassword(password);

        if (passwordError) {
            Alert.alert('Invalid Password', passwordError);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        // Proceed with sign-up logic
        Alert.alert('Success', 'You have signed up successfully');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Your Account!</Text>
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

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirm your password"
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
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
                    <Button title="Sign Up" onPress={handleSignUp} />
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
        color: '#333',
        marginBottom: 30,  // Increased margin for better spacing
        textAlign: 'center', // Center the title text
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
        marginTop: 20,  // Added margin top to shift the container down
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,  // Increased margin for better spacing
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
        marginTop: 20,  // Added margin top for better spacing between inputs and button
    },
});
