import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text, Button, TouchableOpacity } from 'react-native';
import ProductCard from '../Component/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [tempdata, setTempData] = useState([]);
  const [cart, setCart] = useState([]);

  async function fetchdata() {

    const docRef = doc(db, "cllection name", "document name");
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setName(docSnap.data().key);
      await getImage()
    }else{
      alert("No")
    }
  }


  useEffect(() => {
    async function fetchData() {
    const result = await fetch(
    'http://it2.sut.ac.th/labexample/product.php?pageno=' + offset
    );
    const json = await result.json();
    if(json.products.length > 0){
      setOffset(offset + 1);
      setData([...data, ...json.products]);
      setTempData([...data, ...json.products]);
    }else{
      setIsListEnd(true);
    }
    }
    fetchData(); }, [data]);



  function filterItem(val) {
    if (val === 'All') {
      setData(tempdata);
    } else if (val === 'IN STOCK') {
      setData(tempdata.filter((item) => item.stock > 0));
    }
  }


  async function addProd(Pname) {
    try {
        const res = await AsyncStorage.getItem('item');
        var proDuctList = [];
        if(res === undefined || res === null){
          proDuctList = [Pname];
        }else{
          proDuctList = JSON.parse(res);
          proDuctList.push(Pname);
        }
        await AsyncStorage.setItem('item', JSON.stringify(proDuctList));
        alert("บันทึกแล้ว " + Pname);
        getData();
      }catch(e){
        alert(e)
      }
    }
  
    async function getData(){
      try {
        const value = await AsyncStorage.getItem('item');
        if(value !== null){
        setCart(JSON.parse(value));  
        }else{
        setCart([]);
        }
      } catch(e) {
        alert(e);
      }
    }
  
    useEffect(() => {
      getData(); 
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Button title="All" onPress={() => filterItem('All')} />
        <Button title="IN STOCK" onPress={() => filterItem('IN STOCK')} />
      </View>

      <View style={styles.middleView}>
        <ScrollView>
          {data.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => addProd(item.name)}>
              <ProductCard
                name={item.name}
                price={item.price}
                stock={item.stock}
                pic={item.pic}
              />
            </TouchableOpacity>
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
