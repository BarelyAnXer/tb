import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Video } from 'expo-av';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  
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
      const docRef = doc(FIREBASE_DB, "users", "DpPET4dX0Nvf6z8xGvCm"); // Replace the collection name and document ID with your own
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
      const docRef = doc(FIREBASE_DB, "users", "qIElaInShRDFAbyBru7a"); // Replace the collection name and document ID with your own
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


      <Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  video: {
    width: 300,
    height: 200,
  },
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