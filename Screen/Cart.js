import React from "react";
import { View, SafeAreaView, TouchableOpacity, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const db = getFirestore();

    const getData = async () => {
      try {
        const q = query(collection(db, "cart"));
        const querySnapshot = await getDocs(q);
        const cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCart(cartItems);
      } catch (e) {
        console.error(e);
        alert('Error', 'Cannot fetch cart data');
      }
    };

    useFocusEffect(
      useCallback(() => {
        getData();
      }, [])
    );

    async function deleteItem(itemId) {
      try {
        await deleteDoc(doc(db, "cart", itemId));
        alert('ลบสินค้าเรียบร้อย');
        getData();
      } catch (e) {
        console.error(e);
       alert('เออเร่ออีกแล้ว');
      }
    }

    async function handleOrder() {
      if (cart.length === 0) {
        alert('Error');
        return;
      }
      try {
        // Save order to the 'order' collection
        await addDoc(collection(db, "order"), {
          items: cart,
          createdAt: new Date(),
        });
        // Clear cart after saving to order
        await Promise.all(cart.map(item => deleteDoc(doc(db, "cart", item.id))));
        alert('สั่งซื้อเรียบร้อย');
        getData();
      } catch (e) {
        console.error(e);
        alert('เออเร่อจร้');
      }
    }

    return (
    <SafeAreaView style={styles.view}>
        <View style={styles.cartTop}>
            <TouchableOpacity style={styles.clearButton} onPress={handleOrder}>
                <Text style={styles.textButton}>Order</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.cartBottom}>
            <ScrollView style={styles.list}>
                {cart.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => deleteItem(item.id)}>
                    <Text style={styles.textList}>
                      {item.name} {item.quantity}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#F0E68C'
    },
    cartTop: {
      padding: 10,
      alignItems: 'center'
    },
    clearButton: {
      width: 390,
      padding: 10,
      backgroundColor: 'purple',
      alignItems: 'center',
    },
    textButton: {
      color: 'white',
      fontSize: 16,
    },
    cartBottom: {
      flex: 1,
      
    },
    list: {
      flex: 1,
      
    },
    textList: {
      fontSize: 16,
      margin: 10,
      color: 'black'
    }
});
