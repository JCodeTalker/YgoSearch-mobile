import * as React from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';
import { translate } from '../i18n/src/locales';
import { RootTabScreenProps } from '../types';


export default function Home({ navigation }: RootTabScreenProps<'Home'>) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('welcome')}</Text>
      <Text>This is the Home Screen! </Text>
      <Text style={{ margin: 20 }}>{translate('description')}</Text>
      <Image source={require("../assets/images/kuriboh.jpg")} style={{ height: 180, width: 180 }} />
      <View style={styles.buttons} >
        <Button title="Login" onPress={() => navigation.navigate("Modal")} />
        <Text style={styles.separator} ></Text>
        <Button title="Sign Up" onPress={() => navigation.navigate("ModalSignUp")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '15%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    margin: 30,
    height: 35
  }
});
