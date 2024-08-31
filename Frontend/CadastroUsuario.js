import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();  // Navegar de volta após o cadastro
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>

      <Text style={styles.title}>Fazer Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        onChangeText={setDataNasc}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={Cadastrar}>
        <Text>Cadastrar</Text>
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
