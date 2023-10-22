import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    const readData = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    }
    readData();
    console.log("asd")
  }, [])

  const updateItem = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", "VWYe3MDNbke80wKgWPVe"); // Replace the collection name and document ID with your own
      await updateDoc(docRef, {
        first: "Updated",
        last: "Updated",
        born: "Updated"
      });
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };


  const deleteItem = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", "VWYe3MDNbke80wKgWPVe"); // Replace the collection name and document ID with your own
      await deleteDoc(docRef);
      console.log("Document Deleted successfully");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const addItem = async (data) => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };



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

      <TouchableOpacity
        onPress={addItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={deleteItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={updateItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Update</Text>
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