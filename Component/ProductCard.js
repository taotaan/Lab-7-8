import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { getAuth } from 'firebase/auth'; 

export default function ProductCard(props) {
  const [cuser, setCuser] = useState(null);

  async function Order(id, name) {
 
    if (cuser) {
      try {
      
        const docRef = await addDoc(collection(db,  'cart'), {
          name: name,
          productid: id,
        });
        alert('Addedd!!!');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Error', 'กรุณาเข้าสู่ระบบก่อน');
    }
  }

  useEffect(() => {
  
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setCuser(user); 
    } else {
      setCuser(null);
    }
  }, []);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => Order(props.id, props.name)}>
        <Image source={{ uri: props.pic }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.stock}>จำนวนคงเหลือ {props.stock}</Text>
          <Text style={styles.price}>฿{props.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    alignItems: 'center',
  },
  details: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    fontSize: 16,
    color: 'red',
    textAlign: 'left',
  },
  stock: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'left',
  },
});
