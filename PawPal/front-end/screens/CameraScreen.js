import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

// List of dog breeds
const breedNames = [
    "Chihuahua", "Japanese_spaniel", "Maltese_dog", "Pekinese", "Shih-Tzu",
    "Blenheim_spaniel", "papillon", "toy_terrier", "Rhodesian_ridgeback",
    "Afghan_hound", "basset", "beagle", "bloodhound", "bluetick",
    "black-and-tan_coonhound", "Walker_hound", "English_foxhound",
    "redbone", "borzoi", "Irish_wolfhound", "Italian_greyhound", "whippet",
    "Ibizan_hound", "Norwegian_elkhound", "otterhound", "Saluki",
    "Scottish_deerhound", "Weimaraner", "Staffordshire_bullterrier",
    "American_Staffordshire_terrier", "Bedlington_terrier", "Border_terrier",
    "Kerry_blue_terrier", "Irish_terrier", "Norfolk_terrier", "Norwich_terrier",
    "Yorkshire_terrier", "wire-haired_fox_terrier", "Lakeland_terrier",
    "Sealyham_terrier", "Airedale", "cairn", "Australian_terrier",
    "Dandie_Dinmont", "Boston_bull", "miniature_schnauzer", "giant_schnauzer",
    "standard_schnauzer", "Scotch_terrier", "Tibetan_terrier",
    "silky_terrier", "soft-coated_wheaten_terrier", "West_Highland_white_terrier",
    "Lhasa", "flat-coated_retriever", "curly-coated_retriever", "golden_retriever",
    "Labrador_retriever", "Chesapeake_Bay_retriever", "German_short-haired_pointer",
    "vizsla", "English_setter", "Irish_setter", "Gordon_setter",
    "Brittany_spaniel", "clumber", "English_springer", "Welsh_springer_spaniel",
    "cocker_spaniel", "Sussex_spaniel", "Irish_water_spaniel", "kuvasz",
    "schipperke", "groenendael", "malinois", "briard", "kelpie",
    "komondor", "Old_English_sheepdog", "Shetland_sheepdog", "collie",
    "Border_collie", "Bouvier_des_Flandres", "Rottweiler", "German_shepherd",
    "Doberman", "miniature_pinscher", "Greater_Swiss_Mountain_dog",
    "Bernese_mountain_dog", "Appenzeller", "EntleBucher", "boxer",
    "bull_mastiff", "Tibetan_mastiff", "French_bulldog", "Great_Dane",
    "Saint_Bernard", "Eskimo_dog", "malamute", "Siberian_husky",
    "affenpinscher", "basenji", "pug", "Leonberg", "Newfoundland",
    "Great_Pyrenees", "Samoyed", "Pomeranian", "chow", "keeshond",
    "Brabancon_griffon", "Pembroke", "Cardigan", "toy_poodle",
    "miniature_poodle", "standard_poodle", "Mexican_hairless", "dingo",
    "dhole", "African_hunting_dog"
];

// Function to map the breed index to the breed name
const mapBreedIndexToName = (index) => {
    return breedNames[index] || "Unknown Breed";
};

export default function CameraScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        openCamera();
    }, []);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Camera result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
                const imageUri = result.assets[0].uri;
                setLoading(true);

                const manipResult = await ImageManipulator.manipulateAsync(
                    imageUri,
                    [],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );

                console.log('Manipulated image result:', manipResult);

                setImage(manipResult.uri);
                await handlePrediction(manipResult.uri);
            } else {
                alert('No valid image URI returned.');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error opening camera or processing image:', error);
            alert('Error processing image. Please try again.');
            setLoading(false);
        }
    };

    const handlePrediction = async (uri) => {
        const formData = new FormData();
        formData.append('image', {
            uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await axios.post('http://192.168.86.226:3000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const breedIndex = response.data.breedIndex;
            const breedName = mapBreedIndexToName(breedIndex);

            if (breedName) {
                setLoading(false);
                navigation.navigate('Profile', { imageUri: uri, breedName });
            } else {
                setLoading(false);
                alert('Could not determine the breed. Please try again.');
            }
        } catch (error) {
            console.error('Error during prediction:', error);
            setLoading(false);
            alert('Error predicting breed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Camera Screen</Text>
            <Text style={styles.text}>Taking a picture...</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                image && <Image source={{ uri: image }} style={styles.image} />
            )}

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
