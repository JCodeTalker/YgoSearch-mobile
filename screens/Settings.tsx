import { RootStackScreenProps } from "../types";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext, UserDataType } from "../contexts/auth";
import { Button, Icon } from "react-native-elements";
import { getAuth } from "@firebase/auth";


export function Settings({ navigation }: RootStackScreenProps<"Settings">) {

  const { userData, setUserData } = useContext(AuthContext)


  function signOut() {
    const auth = getAuth()
    auth.signOut()
    setUserData({} as UserDataType)
    navigation.navigate("Root")
  }

  return (
    <View style={styles.container} >
      <View style={styles.content} >
        <Text>User Profile:</Text>
        <Icon tvParallaxProperties name="account-circle" type="material" size={60} />
        <Text>User name: {userData.name} </Text>
        <Text>E-mail: {userData.email} </Text>
      </View>
      <Button title="Sign Out" onPress={signOut} style={{ marginTop: 50 }} ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  content: {
    padding: 20
  }
})