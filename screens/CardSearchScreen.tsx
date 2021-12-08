import { doc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Image, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';
import { db } from '../firebase/firebase';
import { useCardSearch } from '../hooks/useCardSearch';
import { translate } from '../i18n/src/locales';
import { cardType, RootTabScreenProps } from '../types';


export default function CardSearchScreen({ navigation }: RootTabScreenProps<"CardSearch">) {
  const [text, setText] = useState(translate("searchBar"))
  const [cardRes, setRes] = useState<cardType>()
  const { userData } = React.useContext(AuthContext)

  async function onSubmitSearch() {
    let cardResult = await useCardSearch({ exact: true, name: text })
    setRes(cardResult[0])
  }

  async function addToWishList() {
    if (cardRes) {
      await setDoc(doc(db, "usuarios", userData.email, "Card WishList", cardRes.name), cardRes as cardType)
    }
  }

  return (
    <ScrollView>
      <View>
        <TextInput style={{ borderStyle: "solid", borderColor: "black", borderWidth: 0.5, margin: 5 }} value={text} onChangeText={text => setText(text)} onSubmitEditing={event => (setText(event.nativeEvent.text), onSubmitSearch())} />
        <Text style={styles.desc} >{cardRes?.desc}</Text>
        <Image source={{ uri: cardRes?.card_images[0].image_url_small }} style={{ width: 200, height: 300, margin: 5, alignSelf: "center" }} />
        <Button onPress={addToWishList} title={translate("wishButton")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    padding: 10
  },
});
