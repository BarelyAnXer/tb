import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_DB, FIREBASE_APP, FIREBASE_STORAGE } from '../firebase';
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";


const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleLogout = () => {
    // signOut(FIREBASE_AUTH)
    // .then(() => {
    navigation.navigate('Login');
    // })
    // .catch((error) => {
    //   console.error('Error signing out:', error);
    // });
  };


  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    try {
      const storageRef = ref(FIREBASE_STORAGE, "image.png");

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


  useEffect(() => {
    // const fetchImageUrl = async () => {
    //   const doc = await FIREBASE_DB.collection('collectionName').doc('docId').get();
    //   if (doc.exists) {
    //     setImageUrl(doc.data().imageUrl);
    //   }
    // };

    // fetchImageUrl();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.uploadButton} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});