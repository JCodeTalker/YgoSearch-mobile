import * as React from 'react';
import { StyleSheet, TextInput, Switch, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';
import { RootTabScreenProps } from '../types';


export default function ModalSignUp({ navigation }: RootTabScreenProps<'SignUp'>) {

  const [fName, onChangeFName] = React.useState("")
  const [LName, onChangeLName] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [passwordConfirm, onChangeConfirm] = React.useState("")
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleSwitch = () => setIsEnabled(prevState => !prevState)
  const { useCreateUser } = React.useContext(AuthContext)

  async function signUp() {
    const signResult = await useCreateUser(email, password, fName, LName)
    if (signResult) navigation.navigate("Main")
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.nameContainer} >
        <TextInput placeholder="First Name" style={styles.nameInput} onChangeText={onChangeFName} />
        <TextInput placeholder="Last Name" style={styles.nameInput} onChangeText={onChangeLName} />
      </View>

      <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' onChangeText={onChangeEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} onChangeText={onChangePassword} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry={true} onChangeText={onChangeConfirm} />

      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ marginTop: 15 }} >I agree with privacy and policy</Text>
      </View>

      <Text style={styles.forgotPass}>Forgot Password</Text>

      <Pressable onPressOut={signUp} style={{ display: "flex", paddingHorizontal: 100, justifyContent: 'center' }} >
        <Text style={styles.signInButton} >Sign Up</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: 300,
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'space-between'
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
  nameInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    width: 140
  },
  switchContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 5,
  },
  forgotPass: {
    marginTop: 15, marginHorizontal: 20, color: "red"
  },
  signInButton: {
    fontWeight: 'bold',
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#ff3300",
    color: "white",
    borderRadius: 20,
    marginTop: 20,
    // alignSelf: 'center'
  }
});
