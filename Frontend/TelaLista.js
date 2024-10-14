import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, Button, } from 'react-native';

export function TelaLista({ navigation }) {
  // Estado para armazenar a lista de usuários
  const [data, setData] = useState([]);

  // useEffect para buscar a lista de usuários quando o componente é montado
  useEffect(() => {
    async function fetchList() {
      fetch('https://tet-nicole.glitch.me/usuarios', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          setData(resJson); // Atualiza o estado com a lista de usuários
        })
        .catch((e) => console.log(e)); // Log de erros caso a busca falhe
    }
    fetchList();
  }, []);

  // Função para excluir um usuário
  // Função para excluir um usuário diretamente
  const Excluir = (usu_id) => {
    console.log('ID a ser excluído:', usu_id); // Para depuração

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    // Fazer a requisição DELETE
    fetch('https://tet-nicole.glitch.me/usuarios/' + usu_id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao excluir o usuário.'); // Lançar erro se a resposta não for OK
        }
        return response.text(); // Receber o resultado como texto
      })
      .then((result) => {
        console.log('Resultado da exclusão:', result); // Logar o resultado da exclusão

        // Atualizar a lista após excluir
        setData(data.filter((user) => user.Id !== usu_id));
      })
      .catch((error) => {
        console.log('Erro na exclusão:', error); // Logar erro
      });
  };


  const Editar = (usuario) => {
    navigation.navigate('EditarUsuario', usuario);
  };

  // Função para formatar a data removendo o "T00:00:00.000Z"
  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  // Para renderizar cada item da lista
  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>ID: {item.Id}</Text>
        <Text>Nome: {item.Nome}</Text>
        <Text>Estado: {item.Estado}</Text>
        <Text>Cidade: {item.Cidade}</Text>
        <Text>Bairro: {item.Bairro}</Text>
        <Text>Data de Nascimento: {formatarData(item.DataNasc)}</Text>
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


  //Para separar itens na lista
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