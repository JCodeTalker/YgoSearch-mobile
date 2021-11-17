import { View, Text, Image, ScrollView } from "react-native";
import * as React from "react"
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { cardType } from "../types";

export default function TabThreeScreen() {
  const [cardList, setCardList] = React.useState<cardType[]>()


  React.useEffect(() => {
    async function getDataFromDB() {
      const q = query(collection(db, "users1"))

      let querySnapShot = await getDocs(q)

      let lista: cardType[] = []
      querySnapShot.forEach(doc => {
        if (lista.length > 0) {
          lista.push(doc.data() as cardType)
        } else {
          lista.push(doc.data() as cardType)
        }
      })
      console.log(lista)
      setCardList(lista)
    }
    getDataFromDB()
  }, [])

  React.useEffect(() => {
    console.log(cardList)
  }, [cardList])


  return (
    <ScrollView>
      <Text>
        Your saved list:
      </Text>
      {cardList && cardList.map((card, index) => <Image key={index} source={{ uri: card.card_images[0].image_url_small }} style={{ width: 200, height: 300, margin: 5 }} />)}
    </ScrollView>
  )
}