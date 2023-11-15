import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                try {
                    await setDoc(doc(FIREBASE_DB, "users", user.uid), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    });

                    const userSymptomCollection = collection(FIREBASE_DB, `users/${user.uid}/symptoms`);
                    const symptoms = ["Body Aches", "Bruising or Yellow Skin", "Cold Sweat", "Diarrhea", "Dizziness",
                        "Fever", "Headache", "Insomnia", "Itchy Skin", "Loss of Appetite", "Nausea", "Restlessness", "Skin Rashes",
                        "Upset Stomach", "Vertigo", "Vomiting"];

                    symptoms.forEach(async (symptom) => {
                        await addDoc(userSymptomCollection, {
                            symptom: symptom,
                            isChecked: false
                        });
                    });

                    console.log("Document written with ID: ", user.uid);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">


            <View style={styles.header}>
                <Text></Text>
            </View>

            <View style={{
                width: "80%"
            }}>
                <Text style={{
                    fontSize: 32,
                    alignSelf: "flex-start",
                    marginBottom: 30
                }}>Sign In</Text>
            </View>

            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="First name"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp} // Call handleSignUp function when the Register button is pressed
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>


                <View style={styles.linkContainer}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonOutlineText}>Sign In here</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "green",
        width: '100%',
        minHeight: "20%",
        position: "relative",
        paddingBottom: "20px",
        borderRadius: 20,
        marginBottom: 40
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#5F7C8E',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    linkContainer: {
        display: "flex",
        flexDirection: 'row',
        gap: 5,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})