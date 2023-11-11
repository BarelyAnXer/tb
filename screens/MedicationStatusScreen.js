import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect


const MedicationStatusScreen = () => {
    const [userID, setUserID] = useState('');
    const [userLoaded, setUserLoaded] = useState(false);
    const [medicines, setMedicines] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const getCurrentUserID = () => {
                onAuthStateChanged(FIREBASE_AUTH, (user) => {
                    if (user) {
                        setUserID(user.uid);
                    } else {
                        console.log('No user is signed in');
                    }
                    setUserLoaded(true);
                });
            };

            getCurrentUserID();
        }, [])
    );


    useFocusEffect(
        React.useCallback(() => {
            if (userLoaded && userID !== '') {
                fetchData();
            }
        }, [userLoaded, userID])
    );

    const fetchData = async () => {
        try {
            const userMedsCollection = collection(FIREBASE_DB, `users/${userID}/medicines`);
            const snapshot = await getDocs(userMedsCollection);

            const medicines = [];
            snapshot.forEach((doc) => {
                medicines.push({ id: doc.id, ...doc.data() });
            });

            setMedicines(medicines);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const missedMedicines = medicines.filter((medicine) => !medicine.imgURL);
    const completedMedicines = medicines.filter((medicine) => medicine.imgURL);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Missed Medicines:</Text>
            <FlatList
                data={missedMedicines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.medicineContainer}>
                        <Text>Date: {item.date}</Text>
                        <Text>Medicine: {item.medicine}</Text>
                        <Text>Time: {item.time}</Text>
                    </View>
                )}
            />

            <Text style={styles.heading}>Completed Medicine:</Text>
            <FlatList
                data={completedMedicines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.medicineContainer}>
                        <Text>Date: {item.date}</Text>
                        <Text>Medicine: {item.medicine}</Text>
                        <Text>Time: {item.time}</Text>
                    </View>
                )}
            />

            <Text style={styles.heading}>Medicines</Text>
            <FlatList
                data={medicines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.medicineContainer}>
                        <Text>Date: {item.date}</Text>
                        <Text>Medicine: {item.medicine}</Text>
                        <Text>Time: {item.time}</Text>
                        {item.imgURL ? <Image source={{ uri: item.imgURL }} style={styles.image} /> : <Text>Missed!</Text>}
                    </View>
                )}
            />

            <Button title="Debug" onPress={() => { console.log(medicines, "askdakdjajskd") }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    medicineContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
});

export default MedicationStatusScreen;
