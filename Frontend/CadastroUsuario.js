import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,TextInput,Text,Button,} from 'react-native';
import { TouchableOpacity, View } from 'react-native-gesture-handler';

const CadastroUsuario = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [nome, setNome] = React.useState(''); //Do tipo useState, usada para modificar variaveis. Pegar o que foi digitado pelo usuario
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = useState('');

  const Cadastrar = () => {
    console.log('teste');
    var userObj = { nome: nome, email: email, senha: senha }; //1° atributo, 2° valor
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody); //Para ver se está construido corretamente
    fetch('https://tet-nicole.glitch.me/usuarios', {
      //Faz a requesição HTTP
      method: 'POST',
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

  return (
    <SafeAreaView>
      <p style={styles.title}> Cadastro </p>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={(event) => setNome(event)} //Sempre que o texto for modificado será acionado o event, será enviado o valor digitado
      />

      <TextInput
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
        placeholder="E-mail"
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
        <Text onPress={Cadastrar}>Cadastrar</Text>
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

export default CadastroUsuario;
