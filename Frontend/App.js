import CadastroUsuario from './CadastroUsuario';
import AtualizaUsuario from './AtualizaUsuario';
import Login from './Login';
import List from './List';
import TelaLista from './TelaLista';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EditarUsuario from './EditarUsuario';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TelaLista" component={TelaLista} />
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Listagem" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}