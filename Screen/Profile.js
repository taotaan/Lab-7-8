import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity, Image, View, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firestore';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
    const [username, setUsername] = useState('');
    const [picture, setPicture] = useState(null);

    async function Logout() {
        await signOut(auth);
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().name);
                        setPicture(docSnap.data().profilePicture); // Assume 'profilePicture' field contains the URL
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission required', 'Sorry, we need media library permissions to make this work');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUrl = result.assets[0].uri;
            setPicture(imageUrl);
            try {
                const userRef = doc(db, 'user', auth.currentUser.uid);
                await updateDoc(userRef, {
                    profilePicture: imageUrl
                });
            } catch (e) {
              console.error(error);
            }
        }
    }

    return (
        <SafeAreaView style={styles.loginScreen}>
            <View style={styles.profileImageContainer}>
                {picture ? (
                    <Image source={{ uri: picture }} style={styles.profileImage} />
                ) : (
                    <Icon name="person" size={100} style={styles.profileImage} />
                )}
            </View>
            <Text style={styles.username}>{username || "Your Name"}</Text>
            <TouchableOpacity style={styles.loginButton} onPress={pickImage}>
                <Text style={styles.textButton}>Change Profile Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0E68C',
    },
    profileImageContainer: {
      height: 100,
      width: 100,
      borderRadius: 50,
      overflow: 'hidden',
      marginBottom: 20,
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
    },
    loginButton: {
      width: '80%',
      padding: 15,
      backgroundColor: '#6A5ACD',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    logoutButton: {
      width: '80%',
      padding: 15,
      backgroundColor: 'red',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    }
});
