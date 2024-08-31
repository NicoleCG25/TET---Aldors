import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');

  const verificarLogin = () => {
    var userObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log('Verificando Login');
    fetch('https://tet-nicole.glitch.me/login', {
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
        if (json.mensagem === 'Sucesso!') {
          setMensagem('Email ou senha válido!');
          navigation.navigate('AtualizaUsuario', { idUsuario: json.id });
        } else {
          setMensagem('Email ou senha inválidos!');
        }
      })
      .catch((err) => {
        console.log(err); //Mostrar erro
      });
  };

  return (
    <SafeAreaView>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
        placeholder="E-mail"
      />

      <TextInput
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
        placeholder="Senha"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
        <Text onPress={verificarLogin}>Verificar Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AtualizaUsuario', {});
        }}>
        <Text style={styles.buttonText}>Atualizar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('CadastroUsuario', {});
        }}>
        <Text>Fazer Cadastro</Text>
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

export default Login;
