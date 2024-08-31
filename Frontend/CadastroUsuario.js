import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const Cadastrar = () => {
    // Verificar se todos os campos estão preenchidos
    if (!nome || !estado || !cidade || !bairro || !dataNasc || !email || !senha) {
      return;
    }

    // Criar o objeto de usuário e convertê-lo para JSON
    const userObj = { nome, estado, cidade, bairro, dataNasc, email, senha };
    const jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);

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
