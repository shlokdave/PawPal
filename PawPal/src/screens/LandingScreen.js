import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions } from 'react-native';

export default function LandingScreen({ navigation }) {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const windowHeight = Dimensions.get('window').height;

    // Calculate content height dynamically or set a fixed height
    const contentHeight = windowHeight + 400; // Ensure this is greater than the window height to enable scrolling

    const scrollIndicatorHeight = windowHeight * (windowHeight / contentHeight);
    const scrollIndicatorPosition = scrollY.interpolate({
        inputRange: [0, Math.max(0, contentHeight - windowHeight)],
        outputRange: [0, windowHeight - scrollIndicatorHeight],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* Welcome Message and Branding */}
                <View style={styles.header}>
                    <Image
                        // source={require('../../assets/PawPalLogo.png')} // Replace with your actual logo
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.appName}>PawPal</Text>
                    <Text style={styles.welcomeMessage}>Welcome to PawPal! Your ultimate pet care assistant.</Text>
                </View>

                {/* Pet Profile/Quick Access */}
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={require('../../assets/MyPet.png')}
                            style={styles.profileIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.profileText}>My Pet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addPetButton}>
                        <Text style={styles.addPetText}>Add New Pet</Text>
                    </TouchableOpacity>
                </View>

                {/* Personalized Tips and Recommendations */}
                <View style={styles.tipsSection}>
                    <Text style={styles.sectionTitle}>Daily Tips</Text>
                    {/* Example Tip */}
                    <Text style={styles.tip}>Did you know? Regular grooming keeps your pet healthy and happy!</Text>
                    {/* Add more tips as needed */}
                </View>

                {/* Navigation Menu */}
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search tips, articles, breeds..."
                    />
                </View>

                {/* Community and Social Features */}
                <View style={styles.communitySection}>
                    <Text style={styles.sectionTitle}>Community</Text>
                    {/* Example User Feed */}
                    <Text style={styles.feedItem}>John shared a photo of Bella!</Text>
                    {/* Add more feed items as needed */}
                </View>
            </ScrollView>

            {/* Custom Scroll Indicator */}
            <Animated.View style={[styles.scrollIndicator, { height: scrollIndicatorHeight, transform: [{ translateY: scrollIndicatorPosition }] }]} />

            {/* Fixed Bottom Bar with Line and Icons */}
            <View style={styles.bottomBar}>
                <View style={styles.line} />
                {/* Icons in the Bottom Bar */}
                <View style={styles.iconRow}>
                    <Image
                        source={require('../../assets/HomeIcon.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={require('../../assets/MyPet.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                        <Image
                            source={require('../../assets/CameraIcon.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/BelIIcon.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../../assets/SettingsIcon.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 60, // Ensure there's space above the fixed bottom bar
        flexGrow: 1, // Ensure ScrollView takes up all available space
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    welcomeMessage: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
    },
    scanSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    scanButton: {
        alignItems: 'center',
        backgroundColor: '#f9a825',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    scanIcon: {
        width: 50,
        height: 50,
    },
    scanText: {
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    profileIcon: {
        width: 60,
        height: 60,
    },
    profileText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    addPetButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    addPetText: {
        color: '#fff',
        fontSize: 16,
    },
    tipsSection: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tip: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    searchSection: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    communitySection: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    feedItem: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    scrollIndicator: {
        position: 'absolute',
        width: 4,
        backgroundColor: '#f9a825',
        top: 0,
        right: 10,
        borderRadius: 2,
    },
    bottomBar: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10, // Adjust padding if needed
    },
    line: {
        height: 2, // Height of the line
        backgroundColor: '#000', // Line color (black in this case)
        width: '100%',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Space out the icons evenly
        alignItems: 'center',
    },
    icon: {
        width: 30, // Set the desired width for the icons
        height: 30, // Set the desired height for the icons
    },
});
