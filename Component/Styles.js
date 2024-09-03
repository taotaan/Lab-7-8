import { StatusBar, StyleSheet } from 'react-native';
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 4,
      borderColor: '#f0e6db',
      borderWidth: 1,
      padding: 10,
      width: 400,
      alignItems: 'left',
      margin: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
      alignSelf: 'center',
    },
    productName: {
      fontSize: 16,
      color: '#000',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 14,
      color: 'red',
    },
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        paddingTop: StatusBar.currentHeight,
    },
    productSize: {
        color: 'gray',  
        fontSize: 16,
        marginBottom: 10,
      }
  });

  export default styles;
  