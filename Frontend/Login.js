import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');

  const verificarLogin = () => {
    var userObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log('Verificando Login');
    fetch('https://tet-nicole.glitch.me/login', {
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
        if (json.mensagem === 'Sucesso!') {
          setMensagem('Email ou senha válido!');
          navigation.navigate('AtualizaUsuario', { idUsuario: json.id });
        } else {
          setMensagem('Email ou senha inválidos!');
        }
      })
      .catch((err) => {
        console.log(err);
        setMensagem('Erro ao verificar login.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail"
        value={email}
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setSenha(text)}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={verificarLogin}>
        <Text>Verificar Login</Text>
      </TouchableOpacity>

      <Text style={styles.message}>{mensagem}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AtualizaUsuario', { idUsuario: 'some-id' });
        }}>
        <Text>Atualizar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('CadastroUsuario');
        }}>
        <Text>Fazer Cadastro como Usuário</Text>
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
  message: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Login;
