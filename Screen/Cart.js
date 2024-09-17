import React from "react";
import { View, SafeAreaView, TouchableOpacity, Text, ScrollView,StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Cart(){

    const [Cart, setCart] = useState([]);

    const getData = useCallback(async () => {
      try {
        const value = await AsyncStorage.getItem('item');
        if (value !== null) {
            setCart(JSON.parse(value));
        } else {
            setCart([]);
        }
      } catch (e) {
        alert(e);
      }
    }, []);
    
      useFocusEffect(
        useCallback(() => {
          getData(); 
        }, [getData])
      );
    
      async function removeValue(){
        try {
        await AsyncStorage.removeItem('item');
        alert('ตะกร้าสินค้าถูกลบแล้ว');
        getData();
        } catch(e) {
    
        alert('ลบทำไม');
        }
      }

    return (
    <SafeAreaView style={styles.view}>
        <View style={styles.cartTop}>
            <TouchableOpacity style={styles.clearButton} onPress={()=>removeValue()}>
                <Text style={styles.textButton}>Clear</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.cartBottom}>
            <ScrollView style={styles.list}>
                {Cart.map((item, index) => (<Text style={styles.textList} key={index}>{item}</Text>))}
            </ScrollView>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#F0E68C'  // Light yellow background
    },
    cartTop: {
      padding: 10,
      alignItems: 'center'
    },
    clearButton: {
    width: 390,
      padding: 10,
      backgroundColor: 'purple',  // Purple background for the clear button
      alignItems: 'center',
    },
    textButton: {
      color: 'white',  // White text for clear button
      fontSize: 16,
    
    },
    cartBottom: {
      flex: 1
    },
    list: {
      flex: 1
    },
    textList: {
      fontSize: 16,
      margin: 10,
      color: 'black'  // Black text for list items
    }
  });