import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [mensagem, setMensagem] = useState('');

  const Cadastrar = () => {
    console.log('teste');
    var userObj = { nome, email, senha, estado, cidade, bairro, dataNasc };
    var jsonBody = JSON.stringify(userObj);
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
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Fazer Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        onChangeText={setEstado}
        value={estado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        onChangeText={setCidade}
        value={cidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        onChangeText={setBairro}
        value={bairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        onChangeText={setDataNasc}
        value={dataNasc}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={Cadastrar}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
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
