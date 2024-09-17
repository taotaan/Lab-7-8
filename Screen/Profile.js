import React from "react";
import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile({ navigation }) { 
  
    const handleLogout = () => {
      
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.LoginScreen}>
            <Icon name="person" size={100} style={styles.profileImage} />
            <Text style={styles.username}>Your Name</Text>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.textButton}>Change Profile Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.textButton}>Logout</Text>
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
    profileImage: {
    
      width: 100,  
      height: 100, 
      alignItems: 'center',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
      marginTop: 20,
    },
    loginButton: {
      width: '80%',
      padding: 15,
      backgroundColor: '#6A5ACD', 
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    logoutButton: {  // สไตล์สำหรับปุ่ม logout
      width: '80%',
      padding: 15,
      backgroundColor: 'red',  // สีแดงเพื่อเน้นการออกจากระบบ
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
