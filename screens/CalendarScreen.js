import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FIREBASE_DB, FIREBASE_AUTH, FIREBASE_STORAGE } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const CalendarScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [medicine, setMedicine] = useState('');
    const [time, setTime] = useState('');
    const [clickedDate, setClickedDate] = useState('');
    const [medicinesList, setMedicinesList] = useState([]);
    const [userID, setUserID] = useState('')
    const [imageUrls, setImageUrls] = useState({});

    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const getCurrentUserID = () => {
            onAuthStateChanged(FIREBASE_AUTH, (user) => {
                if (user) {
                    setUserID(user.uid);
                } else {
                    console.log('No user is signed in');
                }
                // Set the userLoaded state to true after setting the ID
                setUserLoaded(true);
            });
        };

        getCurrentUserID();
    }, []);

    useEffect(() => {
        const fetchImageUrls = async () => {
            const urls = {};
            for (const med of medicinesList) {
                const url = await fetchImageUrl(med.imgURL);
                urls[med.id] = url;
            }
            setImageUrls(urls);
        };

        fetchImageUrls();
    }, [medicinesList]);

    useEffect(() => {
        // Fetch data only if the user ID is loaded and not empty
        if (userLoaded && userID !== '') {
            fetchMedicines();
        }
    }, [userLoaded, userID]);

    const fetchMedicines = async () => {
        const userMedsCollection = collection(FIREBASE_DB, `users/${userID}/medicines`);
        const snapshot = await getDocs(userMedsCollection);

        const medicines = [];
        snapshot.forEach((doc) => {
            medicines.push({ id: doc.id, ...doc.data() });
        });
        setMedicinesList(medicines);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const saveDataToFirebase = async () => {
        const userMedsCollection = collection(FIREBASE_DB, `users/${userID}/medicines`);

        try {
            await addDoc(userMedsCollection, {
                medicine: medicine,
                time: time,
                date: clickedDate,
                imgURL: `${medicine}-${clickedDate}-${time}-${userID}`
            });
            console.log('Medicine data added for user ID: ', userID);
        } catch (e) {
            console.error('Error adding medicine data: ', e);
        }

        toggleModal();
        fetchMedicines();
    };

    const deleteMedicine = async (id) => {
        try {
            const docRef = doc(FIREBASE_DB, `users/${userID}/medicines`, id)
            await deleteDoc(docRef);
            console.log('Medicine deleted with ID: ', id);
        } catch (e) {
            console.error('Error deleting medicine: ', e);
        }

        fetchMedicines(); // Refresh the medicine list after deleting a medicine
    };

    const customMarkedDates = {
        '2023-11-20': { selected: true, selectedColor: 'blue', marked: true },
        '2023-11-24': { customStyles: { backgroundColor: 'red' } },
    };

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        try {
            const storageRef = ref(FIREBASE_STORAGE, `${medicine}-${clickedDate}-${time}-${userID}`);

            const response = await fetch(result.uri);
            const blob = await response.blob();
            console.log(result, "RESULT")
            console.log(response, "RESPONSE")

            await uploadBytes(storageRef, blob);
            console.log('Image uploaded successfully.');
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    const fetchImageUrl = async (imgURL) => {
        console.log("WAKWAWKAWKAWK")
        try {
            const storageRef = ref(FIREBASE_STORAGE, imgURL);
            const url = await getDownloadURL(storageRef);
            console.log(url);
            return url;
        } catch (error) {
            console.error('Error fetching image URL: ', error);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                // Configure your calendar here
                markedDates={customMarkedDates}
                onDayPress={(day) => {
                    setClickedDate(day.dateString);
                    toggleModal();
                }}
            />

            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Medicine:</Text>
                        <TextInput
                            style={styles.input}
                            value={medicine}
                            onChangeText={text => setMedicine(text)}
                            placeholder="Enter medicine name"
                        />

                        <Text>Time:</Text>
                        <TextInput
                            style={styles.input}
                            value={time}
                            onChangeText={text => setTime(text)}
                            placeholder="Enter time"
                        />

                        <Button title="Save" onPress={saveDataToFirebase} />

                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.exit}>Close</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.uploadButton} onPress={handleChooseImage}>
                            <Text style={styles.buttonText}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Display Medicines */}
            <View>
                {medicinesList.map((med, index) => (
                    <View key={med.id} style={styles.medicineItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Display the medicine image */}
                            <Image
                                source={{ uri: imageUrls[med.id] }}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                            <Text>{med.medicine} - {med.time}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteMedicine(med.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
        paddingHorizontal: 10,
    },
    exit: {
        backgroundColor: 'red',
        marginTop: 10,
    },
    medicineItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        color: 'red',
    },
});

export default CalendarScreen;
