import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ProductCard from './Component/ProductCard'; 

export default function App() {
  const DATA = [
    {
      "id": "1",
      "name": "Pantene แพนทีน มิราเคิล คริสตัล สมูท แชมพู+ครีมนวดผม 500 มล.",
      "price": "599",
      "stock": "2",
      "cate": "ผลิตภัณฑ์ดูแลผม",
      "pic": "https://img.lazcdn.com/g/p/031f31a1047a84d97239dcf613bccfb1.jpg_2200x2200q80.jpg_.webp"
      },
      {
      "id": "2",
      "name": "ลอรีอัล ปารีส เอลแซฟ เอ็กซ์ตรอว์ดินารี่ ออยล์ 100 มล. (Extraordinary, บำรุงผม, น้ำมันใส่ผม, เซรั่มบำ ",
      "price": "259",
      "stock": "0",
      "cate": "ผลิตภัณฑ์ดูแลผม",
      "pic": "https://st-th-1.byteark.com/assets.punpro.com/affiliate/product/1646716109-1b752abb1496965c1714eaa262ed5f4c.jpg"
      },
      {
      "id": "3",
      "name": "Microsoft Surface Pro 7 Laptop with Type Cover",
      "price": "38900",
      "stock": "5",
      "cate": "Computer",
      "pic": "https://www.jib.co.th/img_master/product/original/2021031014531545721_1.jpg"
      },
      {
      "id": "4",
      "name": "Desktop PC DELL Optiplex 3080SFF-SNS38SF001",
      "price": "14400",
      "stock": "3",
      "cate": "Computer",
      "pic": "https://img.advice.co.th/images_nas/pic_product4/A0134100/A0134100OK_BIG_1.jpg"
      },
      {
      "id": "5",
      "name": "ซัมซุง ตู้เย็น 2 ประตู รุ่น RT20HAR1DSA/ST ขนาด 7.4 คิว",
      "price": "6990",
      "stock": "10",
      "cate": "เครื่องใช้ไฟฟ้า",
      "pic": "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/26/88/8806086028226/8806086028226_2_3.jpg"
      }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {DATA.map(item => (
          <ProductCard
            key={item.id}
            name={item.name}
            price={item.price}
            stock={item.stock}
            pic={item.pic}
          />
        ))}
      </ScrollView>
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

  
 
