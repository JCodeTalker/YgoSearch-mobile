import { Text, Image, ScrollView, StyleSheet, ToastAndroid, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { cardType, RootTabScreenProps } from "../types";
import { translate } from "../i18n/src/locales";
import { AuthContext } from "../contexts/auth";

export default function WishList({ navigation }: RootTabScreenProps<"WishList">) {
  const [cardList, setCardList] = React.useState<cardType[]>()
  const { userData } = React.useContext(AuthContext)
  const [limit, setLimit] = useState(3)

  const handleScroll = (info: { distanceFromEnd: number }) => {
    setLimit(prev => prev + 2)
  }

  useEffect(() => {
    try {
      const q = query(collection(db, "usuarios", userData.email, "Card WishList"))
      let unsubscribe = onSnapshot(q, (snap) => {
        let lista: cardType[] = []
        if (!snap.empty) {
          snap.forEach(doc => {
            if (lista.length > 0) {
              lista.push(doc.data() as cardType)
            }
            else {
              lista.push(doc.data() as cardType)
            }
          })
        }
        setCardList(lista)
      })

      return () => unsubscribe()
    } catch (err) {
      console.log(err)
      // ToastAndroid.show("You don't have any card saved yet, try searching for a card and adding it to the list first.", ToastAndroid.LONG)
    }
  }, [])

  return (
    <View >
      <Text>
        {translate('listPresent')}
      </Text>
      {/* {cardList && cardList.map((card, index) => <Image key={index} source={{ uri: card.card_images[0].image_url_small }} style={{ width: 200, height: 300, margin: 5 }} />)} */}
      {cardList && <FlatList
        onEndReached={handleScroll}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.container}
        data={cardList}
        renderItem={(card) => { if (card.index < limit) { return <Image key={card.index} source={{ uri: card.item.card_images[0].image_url_small }} style={{ width: 200, height: 300, margin: 5 }} /> } else { return <Image source={{}} /> } }}
      />}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  }
})