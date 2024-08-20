import CadastroUsuario from './CadastroUsuario';
import AtualizaUsuario from './AtualizaUsuario';
import Login from './Login';
import List from './List';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
return (
<NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name = "Listagem" component={List} />
    <Stack.Screen name = "Login" component={Login} />
    <Stack.Screen name = "AtualizaUsuario" component={AtualizaUsuario} />
    <Stack.Screen name = "CadastroUsuario" component={CadastroUsuario} />
  </Stack.Navigator>
</NavigationContainer>
);
}