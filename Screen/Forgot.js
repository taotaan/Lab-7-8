import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { auth } from '../firestore';
import { sendPasswordResetEmail } from 'firebase/auth';


export default function Forgot({navigation}){

  const [email, setEmail] = useState("");

  const forgotPassword = () => {
    
    
    sendPasswordResetEmail(auth, email).then(() => {
      alert ("ดำเนินการเสร็จสิ้น โปรดตรวจสอบที่อีเมลของท่าน");
      Keyboard.dismiss();
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error + ": " + errorMessage);
    })
  }


    return (
    <SafeAreaView style={styles.LoginScreen}>
        <Text style={styles.TextLogin}>Forget Password</Text>
        <TextInput style={styles.input} placeholder='E-mail'   value={email}
  onChangeText={setEmail}
  keyboardType="email"/>
        <TouchableOpacity style={styles.loginButton}  onPress={forgotPassword}><Text style={styles.textButton} >Reset Password</Text></TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonLV2} onPress={() => navigation.goBack()}><Text style={styles.textButtonLV2} >Back</Text></TouchableOpacity>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    LoginScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0E68C', // Consistent light yellow background
    },
    TextLogin: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black', // Standard black text
    },
    input: {
      width: '80%',
      height: 50,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#000', // Black border for clarity
      paddingLeft: 10,
      borderRadius: 5, // Soft rounded corners
      backgroundColor: '#FFFFFF' // White background for clarity
    },
    loginButton: {
      width: '80%',
      padding: 15,
      backgroundColor: '#6A5ACD', // Primary button color (SlateBlue)
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    textButton: {
      color: '#FFFFFF', // White text for readability
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginButtonLV2: {
      width: '80%',
      padding: 15,
      backgroundColor: '#EE82EE', // Secondary button color (Violet)
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    textButtonLV2: {
      color: '#FFFFFF', // White text for secondary buttons
      fontSize: 16,
      fontWeight: 'bold',
    }
  });