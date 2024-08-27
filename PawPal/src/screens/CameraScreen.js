import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        openCamera();
    }, []);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            navigation.navigate('Profile', { imageUri: result.uri }); // Pass imageUri to 'Profile'
        } else {
            navigation.goBack(); // Automatically go back if the camera is cancelled
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Camera Screen</Text>
            <Text style={styles.text}>Taking a picture...</Text>

            {/* Display the captured image */}
            {image && <Image source={{ uri: image }} style={styles.image} />}

            {/* Back button to allow user to go back manually if needed */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
