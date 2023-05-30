    import React, { useState, useEffect, useContext } from 'react';
    import { View, Text, Pressable, SafeAreaView,  StyleSheet } from 'react-native';
    import * as Location from 'expo-location';
    import * as geolib from 'geolib';
    import { useNavigation } from '@react-navigation/native';
    import UserContext from '../UserContext';

    export default function App({navigation}) {
    const [displayText, setDisplayText] = useState('Initial Text');
    const [currentLocation, setCurrentLocation] = useState(null);
    const { userid } = useContext(UserContext);
    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync();
            setCurrentLocation(location);
        } else {
            setDisplayText('Location permission denied');
        }
        } catch (error) {
        console.log('Error getting location:', error);
        setDisplayText('Error getting location');
        }
    };

    const handleButtonPress = (text) => {
        if (currentLocation) {
        const officeLocation = { latitude: 47.927613, longitude: 106.889048 }; // Replace with your office location coordinates
        const distance = geolib.getDistance(
            currentLocation.coords,
            officeLocation
        );
        if (distance <= 50) {
            if (text === 'Arrive') {
            alert(distance+" m")
            setDisplayText('You are arrive');
            } else if (text === 'Depart') {
            alert(distance+" m")
            setDisplayText('You are depart');
            } else if (text === 'Button 3');
        } else {
        
            setDisplayText('You are not here');
            alert(distance+" m")
        
        }
        } else {
        setDisplayText('Location not available');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{displayText}</Text>
        <View style={styles.buttonContainer}>
        <Text>Welcome, User {userid}!</Text>
            <Pressable style={styles.button} onPress={() => handleButtonPress('Arrive')}>
            <Text style={styles.buttonText}>Arrive</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleButtonPress('Depart')}>
            <Text style={styles.buttonText}>Depart</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Arrlist')}>
            <Text style={styles.buttonText}>Ирц харах</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
            </Pressable>
        </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    });
