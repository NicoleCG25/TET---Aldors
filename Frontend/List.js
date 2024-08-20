import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Primeiro Item',
    description: 'Sobre o item ...',
  },
  {
    id: '2',
    title: 'Segundo Item',
    description: 'Sobre o item ...',
  },
  {
    id: '3',
    title: 'Terceiro Item',
    description: 'Sobre o item ...',
  },
  {
    id: '4',
    title: 'Quarto Item',
    description: 'Sobre o item ...',

  },
];

const Item = ({title, description, id}) => (
  <View style={styles.item}>
    <Text style={styles.id}>{id}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <TouchableOpacity>
        <Text>Selecionar</Text>
      </TouchableOpacity>
  </View>
);

const List = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item id={item.id} title={item.title} description={item.description} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#C47EEB',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  id: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 16,
  },
});

export default List;