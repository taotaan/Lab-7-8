import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import { auth } from '../firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore } from '../firestore'; // Ensure Firestore is imported correctly
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

export default function RegisterScreen({navigation}){

  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function UserRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = doc(collRef, user.uid);
      
      await setDoc(userDoc, {
        name: name,
        email: email,
      });

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error + ": " + errorMessage);
    }
  }
  
  return (
    <SafeAreaView style={styles.LoginScreen}>
        <Text style={styles.TextLogin}>Register</Text>
        <TextInput style={styles.input} placeholder='E-mail' value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
        <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={setname} />
        <TouchableOpacity style={styles.loginButton} onPress={UserRegister}><Text style={styles.textButton} >Register</Text></TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonLV2} onPress={() => navigation.goBack()}><Text style={styles.textButtonLV2} >Back</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    LoginScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0E68C',
    },
    TextLogin: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
    },
    input: {
      width: '80%',
      height: 50,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#000',
      paddingLeft: 10,
      borderRadius: 5,
      backgroundColor: '#FFFFFF'
    },
    loginButton: {
      width: '80%',
      padding: 15,
      backgroundColor: '#6A5ACD',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginButtonLV2: {
      width: '80%',
      padding: 15,
      backgroundColor: '#EE82EE',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    textButtonLV2: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    }
});
