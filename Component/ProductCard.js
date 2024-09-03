import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ name, price, stock, pic }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pic }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>฿{price}</Text>
        <Text style={styles.stock}>จำนวนคงเหลือ {stock}</Text>
      </View>
    </View>
  );
};

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

export default ProductCard;
