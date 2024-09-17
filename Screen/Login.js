import React, { useState } from 'react'; // เพิ่มการนำเข้า useState
import { View, Text, TextInput, TouchableOpacity, SafeAreaView , StyleSheet, StatusBar, Image, Alert} from "react-native";
import { auth } from '../firestore'; // นำเข้า auth จากไฟล์ Firestore
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; 

export default function LoginScreen({navigation}){
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  async function UserLogin() {

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Success', 'Login successful.');
      navigation.navigate('Home'); 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error + ": " + errorMessage);
    }
  }

  return (
    <SafeAreaView style={styles.LoginScreen}>
        <Text style={styles.TextLogin}>Login</Text>
        <TextInput 
          style={styles.input} 
          placeholder='E-mail'  
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder='Password' 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={UserLogin} 
        >
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButtonLV2} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textButtonLV2}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButtonLV2} 
          onPress={() => navigation.navigate('Forgot')}
        >
          <Text style={styles.textButtonLV2}>Forget Password</Text>
        </TouchableOpacity>
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
