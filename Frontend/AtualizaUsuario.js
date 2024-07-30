import React, { useState, useEffect } from 'react';
import {SafeAreaView,StyleSheet,TextInput,Text,Button,} from 'react-native';
import { TouchableOpacity, View } from 'react-native-gesture-handler';

const AtualizaUsuario = ({ navigation, route }) => {
  const [nome, setNome] = React.useState(''); //Do tipo useState, usada para modificar variaveis. Pegar o que foi digitado pelo usuario
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = useState('');
  const [number, onChangeNumber] = React.useState('');

  const {idUsuario} = route.params;

  useEffect(() => {
    async function fetchItem() {
      fetch('https://tet-nicole.glitch.me/usuarios/' + idUsuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          setNome(resJson[0].usu_nome);
          setEmail(resJson[0].usu_email);
        })
        .catch((e) => console.log(e));
    }
    fetchItem();
  }, []);

  const Atualizar = () => {
    console.log(jsonBody);
    var userObj = { nome: nome, email: email, senha: senha }; //1° atributo, 2° valor
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody); //Para ver se está construido corretamente
    fetch('https://tet-nicole.glitch.me/usuarios/' + idUsuario, {
      //Faz a requesição HTTP
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack(); //Voltar para a tela anterior (login)
      })
      .catch((err) => {
        console.log(err); //Mostrar erro
      });
  };

  const Deletar = () => {
    fetch('https://tet-nicole.glitch.me/usuarios/' + idUsuario, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Processa a resposta se necessário
        } else {
          throw new Error('Erro ao deletar usuário');
        }
      })
      .then((json) => {
        console.log('Usuário deletado com sucesso:', json);
        navigation.goBack(); // Voltar para a tela anterior (login)
      })
      .catch((err) => {
        console.error('Erro:', err); // Mostrar erro
      });
  };

  return (
    <SafeAreaView>
      <p style={styles.title}> Atualizar </p>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(event) => setNome(event)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(event) => setEmail(event)}
      />

      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={(event) => setSenha(event)}
        placeholder="Senha"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
        <Text onPress={Atualizar}>Atualizar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('CadastroUsuario', {});
        }}>
        <Text>Fazer Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6961' }]}>
        <Text onPress={Deletar}>Deletar Usuário</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
  },

  input: {
    alignSelf: 'center',
    height: 40,
    margin: 9,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: 312,
  },

  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#d8b5ff',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 2,
    width: '94%',
  },
});

export default AtualizaUsuario;
