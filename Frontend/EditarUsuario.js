import { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export function EditarUsuario({ route, navigation }) {
    // Extrair os dados do parâmetro 'route'
    const { Id, Nome, Estado, Cidade, Bairro, DataNasc, Email, Senha } = route.params;

    const [nome, setNome] = useState(Nome);
    const [estado, setEstado] = useState(Estado);
    const [cidade, setCidade] = useState(Cidade);
    const [bairro, setBairro] = useState(Bairro);
    const [dataNasc, setDataNasc] = useState(DataNasc);
    const [email, setEmail] = useState(Email);
    const [senha, setSenha] = useState(Senha);

    const handleUpdate = () => {
        // Cria um objeto vazio para armazenar apenas os campos alterados
        const usuarioAtualizado = {};

        // Adiciona campos alterados ao objeto, mantendo os que não mudaram
        if (nome !== Nome) usuarioAtualizado.nome = nome;
        if (estado !== Estado) usuarioAtualizado.estado = estado;
        if (cidade !== Cidade) usuarioAtualizado.cidade = cidade;
        if (bairro !== Bairro) usuarioAtualizado.bairro = bairro;
        if (dataNasc !== DataNasc) usuarioAtualizado.dataNasc = dataNasc;
        if (email !== Email) usuarioAtualizado.email = email;
        if (senha !== Senha) usuarioAtualizado.senha = senha;

        // Verifica se pelo menos um campo foi alterado
        if (Object.keys(usuarioAtualizado).length === 0) {
            Alert.alert('Erro', 'Nenhum campo foi alterado.');
            return;
        }

        // Fazer a requisição de atualização
        fetch(`https://tet-nicole.glitch.me/usuarios/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioAtualizado),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return res.json();
            })
            .then(() => {
                Alert.alert('Sucesso', 'Usuário atualizado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            })
            .catch((error) => {
                Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
                console.log('Erro:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Editar Usuário</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

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
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default EditarUsuario;
