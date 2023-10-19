import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../firebase';
import { useNavigation } from '@react-navigation/core'


const HomeScreen = () => {

  const navigation = useNavigation();

  const handleLogout = () => {

    // signOut(FIREBASE_AUTH)
    // .then(() => {
    navigation.navigate('Login');
    // })
    // .catch((error) => {
    //   console.error('Error signing out:', error);
    // });
  }

  return (
    <View style={styles.container}>
      <Text>Email: {FIREBASE_AUTH.currentUser?.email}</Text>
      <Text>UID: {FIREBASE_AUTH.currentUser?.uid}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})