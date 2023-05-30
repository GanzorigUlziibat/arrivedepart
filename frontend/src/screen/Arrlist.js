import React, { useEffect,useState,useRef,useContext } from 'react';
import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import UserContext from '../UserContext';
import axios from 'axios';

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
        <Pressable style={styles.button} onPress={() => navigation.navigate('Report')}>
            <Text style={styles.buttonText}>Report</Text>
        </Pressable>
        <Text>Ирсэн цаг: {item.irsentsag}</Text>
        <Text>Явсан цаг: {item.yavsantsag}</Text>
        <Text>Бүртгэсэн цаг: {item.regdate}</Text>

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
    width: 100,
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