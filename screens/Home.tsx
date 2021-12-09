import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';
import { translate } from '../i18n/src/locales';
import { RootTabScreenProps } from '../types';


export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const { userData } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('welcome')}</Text>
      <Text style={{ margin: 20 }}>{translate('description')}</Text>
      <Image source={require("../assets/images/kuriboh.jpg")} style={{ height: 180, width: 180, margin: 20 }} />
      {!userData.name ?
        <View style={styles.buttons} >
          <Button
            icon={{
              name: "login",
              type: "material",
              color: "white"
            }}
            title=" Login " onPress={() => navigation.navigate("SignIn")} />
          <Text style={styles.separator} ></Text>
          <Button
            icon={{
              name: "person-add-alt",
              type: "material",
              color: "white"
            }} title=" Sign Up " onPress={() => navigation.navigate("SignUp")} />
        </View>
        :
        <Button
          icon={{
            name: "play-arrow",
            type: "material",
            color: "white"
          }} title="Get Started"
          onPress={() => navigation.navigate("Main")}
          style={{ marginVertical: 25 }} />
      }
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
    height: 50
  }
});
