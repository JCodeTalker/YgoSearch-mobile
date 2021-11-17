import { addDoc, collection } from '@firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Image, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { db } from '../firebase/firebase';
import { useCardSearch } from '../hooks/useCardSearch';
import { cardType } from '../types';


export default function TabTwoScreen() {
  const [text, setText] = useState("Type a card name...")
  const [cardRes, setRes] = useState<cardType>()

  async function onSubmitSearch() {
    let cardResult = await useCardSearch({ exact: true, name: text })
    setRes(cardResult[0])
  }

  async function addToWishList() {
    if (cardRes) {
      await setDoc(doc(db, "users1", cardRes.name), cardRes as cardType)
    }
  }

  return (
    <ScrollView>

      <View>
        <TextInput style={{ borderStyle: "solid", borderColor: "black", borderWidth: 0.5, margin: 5 }} value={text} onChangeText={text => setText(text)} onSubmitEditing={event => (setText(event.nativeEvent.text), onSubmitSearch())} />
        <Text>{cardRes?.desc}</Text>
        <Image source={{ uri: cardRes?.card_images[0].image_url_small }} style={{ width: 200, height: 300, margin: 5 }} />
        <Button onPress={addToWishList} title="Add to wishlist" />
      </View>
    </ScrollView>
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
    width: '80%',
  },
});
