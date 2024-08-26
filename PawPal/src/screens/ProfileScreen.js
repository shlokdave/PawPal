import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function ProfileScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header with Add New Pet Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.addPetButton}
                    onPress={() => setModalVisible(true)} // Show modal when pressed
                >
                    <Text style={styles.addPetText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Pet Photo Section */}
            <View style={styles.petPhotoContainer}>
                <View style={styles.petPhoto}>
                    <Text style={styles.petPhotoText}>PET PHOTO</Text>
                </View>
            </View>

            {/* Pet Details Section */}
            <View style={styles.petDetailsContainer}>
                <Text style={styles.petDetail}>Name: [Your Pet's Name]</Text>
                <Text style={styles.petDetail}>Breed: [Your Pet's Breed]</Text>
                <Text style={styles.petDetail}>Bday: [Your Pet's Birthday]</Text>
            </View>

            {/* Important Things Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Important Things</Text>
                <TextInput style={styles.input} placeholder="Enter important things..." />
            </View>

            {/* Upcoming Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming</Text>
                <TextInput style={styles.input} placeholder="Enter upcoming events..." />
            </View>

            {/* Routine/Log Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Routine/Log</Text>
                <TextInput style={styles.input} placeholder="Enter routine/log..." />
            </View>

            {/* Modal for Dropdown */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)} // Close modal when back button or touch outside is pressed
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalItem} onPress={() => alert('Quickscan selected')}>
                            <Text style={styles.modalText}>Quickscan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => alert('Upload Photo selected')}>
                            <Text style={styles.modalText}>Upload Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => alert('Enter Details Manually selected')}>
                            <Text style={styles.modalText}>Enter Details Manually</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    addPetButton: {
        backgroundColor: '#007BFF',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPetText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    petPhotoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    petPhoto: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    petPhotoText: {
        fontSize: 16,
        color: '#333',
    },
    petDetailsContainer: {
        marginTop: 20,
        width: '100%',
    },
    petDetail: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    section: {
        marginTop: 20,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalItem: {
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    modalText: {
        fontSize: 18,
        color: '#333',
    },
});
