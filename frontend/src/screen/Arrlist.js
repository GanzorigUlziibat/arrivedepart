//React Native FlatList
//https://aboutreact.com/react-native-flatlist/

//import React in our code
import React, { useEffect,useState,useRef,useContext } from 'react';

//import all the components we are going to use
import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import UserContext from '../UserContext';
import axios from 'axios';


// const dummyArray = [
//   { id: '1', value: 'A' },
//   { id: '2', value: 'B' },
//   { id: '3', value: 'C' },
//   { id: '4', value: 'D' },
//   { id: '5', value: 'E' },
//   { id: '6', value: 'F' },
//   { id: '7', value: 'G' },
//   { id: '8', value: 'H' },
//   { id: '9', value: 'I' },
//   { id: '10', value: 'J' },
//   { id: '11', value: 'K' },
//   { id: '12', value: 'L' },
//   { id: '13', value: 'M' },
//   { id: '14', value: 'N' },
//   { id: '15', value: 'O' },
//   { id: '16', value: 'P' },
//   { id: '17', value: 'Q' },
//   { id: '18', value: 'R' },
//   { id: '19', value: 'S' },
//   { id: '20', value: 'T' },
//   { id: '21', value: 'U' },
//   { id: '22', value: 'V' },
//   { id: '23', value: 'W' },
//   { id: '24', value: 'X' },
//   { id: '25', value: 'Y' },
//   { id: '26', value: 'Z' },
// ];

// const App = ({navigation}) => {
//   const [listItems, setListItems] = useState(dummyArray);
//   const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
//   useEffect(()=>{
//     Animated.timing(translateX,{toValue:0,duration:2000}).start();
//   })
//   const ItemView = ({ item }) => {

//     return (
//       // Single Comes here which will be repeatative for the FlatListItems
//       <Animated.View style={{transform:[{translateY:translateX}]}} >
//         <View style={styles.buttonContainer}>
//         <Text style={styles.item} onPress={() => getItem(item)}>
//           {item.value}
//         </Text>
//         <Pressable style={styles.button} onPress={() => navigation.navigate('Report')}>
//             <Text style={styles.buttonText}>Report</Text>
//           </Pressable>
//           </View>
//       </Animated.View>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       //Item Separator
//       <View
//         style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
//       />
//     );
//   };

//   const getItem = (item) => {
//     //Function for click on an item
//     alert('Id : ' + item.id + ' Value : ' + item.value);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <FlatList
//           data={listItems}
//           //data defined in constructor
//           ItemSeparatorComponent={ItemSeparatorView}
//           //Item Separator View
//           renderItem={ItemView}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//        <View style={styles.container}>
       
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//     marginTop: 30,
    
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     alignItems: 'flex-end',
//     width: 100,
//     height: 30,
// },
// buttonText: {
//     color: '#ffffff',
//     fontSize: 20,
// },
// buttonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
// },
// });

// export default App;



const App = ({navigation}) => {
  const { userid } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post('http://arrive.mandakh.org/arrlist', { userid: userid })
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>irsentsag: {item.irsentsag}</Text>
        <Text>regdate: {item.regdate}</Text>
        <Text>yavsantsag: {item.yavsantsag}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 0,
    
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginTop:60,
    
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    width: 100,
    height: 30,
},
buttonText: {
    color: '#ffffff',
    fontSize: 20,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
});

export default App;