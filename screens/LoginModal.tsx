import * as React from 'react';
import { StyleSheet, TextInput, Switch } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';
import { AccountButton as LoginButton } from '../fragments/AccountButton';
import { RootTabScreenProps } from '../types';


export default function ModalLogin({ navigation }: RootTabScreenProps<'Login'>) {

  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [isEnabled, setIsEnabled] = React.useState(true)
  const toggleSwitch = () => setIsEnabled(prevState => !prevState)
  const { loginIn } = React.useContext(AuthContext)
  async function login() {
    const loginResult = await loginIn(email, password)
    if (loginResult) navigation.navigate("Main")
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="E-mail Address" style={styles.input} onChangeText={onChangeEmail} ></TextInput>
      <TextInput placeholder="Password" style={styles.input} onChangeText={onChangePassword} secureTextEntry={true} ></TextInput>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ marginTop: 15 }} >Remember Me</Text>
        <Text style={styles.forgotPass}>Forgot Password</Text>
      </View>

      <LoginButton text={"Get Started"} buttonListener={login} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 300
  },
  switchContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 5,
  },
  forgotPass: {
    marginTop: 15, marginHorizontal: 52, color: "red"
  }
});
