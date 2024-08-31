import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AtualizaUsuario = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { idUsuario } = route.params;
  console.log("ID do Usuário:", idUsuario);

  useEffect(() => {
    async function fetchItem() {
      try {
        let response = await fetch(`https://tet-nicole.glitch.me/usuarios/${idUsuario}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        let resJson = await response.json();
        console.log("Dados do Usuário:", resJson);
        if (resJson.length > 0) {
          setNome(resJson[0].usu_nome);
          setEmail(resJson[0].usu_email);
        }
      } catch (e) {
        console.log("Erro ao buscar usuário:", e);
      }
    }
    fetchItem();
  }, [idUsuario]);

  const Atualizar = async () => {
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log("Corpo da Requisição de Atualização:", jsonBody);
    try {
      let response = await fetch(`https://tet-nicole.glitch.me/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      });
      let json = await response.json();
      console.log("Resposta:", json);
      navigation.goBack();
    } catch (err) {
      console.log("Erro:", err);
    }
  };

  const Deletar = async () => {
    try {
      let response = await fetch(`https://tet-nicole.glitch.me/usuarios/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });
      let json = await response.json();
      console.log("Resposta:", json);
      navigation.goBack();
    } catch (err) {
      console.log("Erro:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
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
        <Text onPress={Deletar}>Deletar</Text>
      </TouchableOpacity>
    </View>
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