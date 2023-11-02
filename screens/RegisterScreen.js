import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
                console.log("here1")
                // Update user profile with first and last name
                // await user.updateProfile({
                //     displayName: `${firstName} ${lastName}`
                // });
                console.log("here2")
                // Store additional user data in Firebase Firestore
                try {
                    const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    });
                    console.log("Document written with ID: ", docRef.id);
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
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={styles.buttonOutlineText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
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
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        marginTop: 50,
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})