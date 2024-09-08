import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

export function TelaLista({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await fetch('https://tet-nicole.glitch.me/usuarios', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = await response.json();
      setData(resJson);
    } catch (e) {
      console.log(e);
    }
  };

  const Excluir = (usu_id) => {
    return Alert.alert('Confirmar', 'Deseja Excluir?', [
      {
        text: 'Sim',
        onPress: () => {
          fetch('https://tet-nicole.glitch.me/usuarios/' + usu_id, {
            method: 'DELETE',
            redirect: 'follow',
          })
            .then(() => {
              setData(data.filter(item => item.Id !== usu_id));
            })
            .catch((error) => console.log('error', error));
        },
      },
      { text: 'Não' },
    ]);
  };

  const Editar = (usuario) => {
    navigation.navigate('EditarUsuario', usuario);
  };  

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>ID: {item.Id}</Text>
        <Text>Nome: {item.Nome}</Text>
        <Text>Estado: {item.Estado}</Text>
        <Text>Cidade: {item.Cidade}</Text>
        <Text>Bairro: {item.Bairro}</Text>
        <Text>Data de Nascimento: {item.DataNasc}</Text>
        <Text>Email: {item.Email}</Text>
      </View>
      <TouchableOpacity style={styles.listItemButton} onPress={() => Editar(item)}>
        <Text style={{ color: '#9b59b6' }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItemButton} onPress={() => Excluir(item.Id)}>
        <Text style={{ color: '#e74c3c' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={(item) => item.Id.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  listItemView: {
    alignItems: 'center',
    flex: 1,
  },
  listItemTitle: {
    fontWeight: 'bold',
    color: '#8e44ad',
  },
  listItemButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 5,
    marginRight: 5,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9b59b6',
  },
});

export default TelaLista;
