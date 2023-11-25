import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Profile</Text>
            </View>


            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/images/Cold_sweat.png')}
                    style={styles.profileStyle}
                />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 600
                }}>Hi, "Christian" </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Medication Status</Text>
            </TouchableOpacity>


            <Text>Rural Health Unit / Hospital Location</Text>

            <Image
                source={require('../assets/images/Body_aches.png')} // Update the image path accordingly
                style={styles.imageStyle}
                resizeMode="cover"
            />

            <View style={styles.reminder} >
                <Text style={{
                    color: "#455154",
                    fontWeight: "bold",
                    fontSize: 20
                }}>Reminder: </Text>
                <Text style={{
                    color: "#455154",
                    fontWeight: "bold",
                    fontSize: 15
                }}>Take your medicine regularly</Text>
            </View>

        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F7F7F5',
        height: '100%',
    },
    header: {
        backgroundColor: 'green',
        width: '100%',
        minHeight: '20%',
        position: 'relative',
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 40,
    },
    profileContainer: {
        backgroundColor: '#FDFDFB',
        width: '70%',
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#5F7C8E',
        width: '75%',
        padding: 15,
        borderRadius: 5,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    imageStyle: {
        width: '70%',
        height: 150,
        marginBottom: 10,
    },
    profileStyle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,

    },
    reminder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: '#ACE3DE',
        width: '75%',
        padding: 20,
        borderRadius: 5,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
