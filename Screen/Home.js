import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text, Button, TouchableOpacity } from 'react-native';
import ProductCard from '../Component/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firestore';

export default function Home() {
  const [tempData, setTempData] = useState([]);
  const [product, setProduct] = useState([]);
  
  const getProduct = async () => {
    try {
      const querySnap = await getDocs(collection(db, "product"));
      let productsTemp = [];
      querySnap.forEach((doc) => {
        productsTemp.push({ id: doc.id, ...doc.data() }); 
      });
      setProduct(productsTemp);
      setTempData(productsTemp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct(); 
  },[]);


  function filterItem(val) {
    if (val === 'All') {
      setProduct(tempData);
    } else if (val === 'IN STOCK') {
      setProduct(tempData.filter((item) => item.stock > 0));
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Button title="All" onPress={() => filterItem('All')} />
        <Button title="IN STOCK" onPress={() => filterItem('IN STOCK')} />
      </View>

      <View style={styles.middleView}>
        <ScrollView>
  {product.map((item) => (
      <ProductCard
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        stock={item.stock}
        pic={item.pic}
        
      />

  ))}
        </ScrollView>
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    paddingTop: StatusBar.currentHeight,
  },
 
});
