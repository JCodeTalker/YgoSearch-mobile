import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { createContext, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import { db } from "../firebase/firebase";


type ProviderProps = {
  children: ReactNode
}

type UserData = {
  name: string,
  email: string
}

type AuthContextValues = {
  userData: UserData,
  useCreateUser: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>,
  loginIn: (email: string, password: string) => Promise<boolean>
}


export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)


export function AuthContextProvider(props: ProviderProps) {

  const [userData, setUserData] = React.useState({} as UserData)


  // async function addToWishList() {
  //   if (cardRes) {
  //     await setDoc(doc(db, "users1", cardRes.name), cardRes as cardType)
  //   }
  // }

  async function useCreateUser(email: string, password: string, firstName: string, lastName: string) {
    const auth = getAuth()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user.email) {
        // userData && await setDoc(doc(db, "usuarios", firstName, "lpç", "fodsfk"), userData) // save in subcollection
        const fullName = firstName + " " + lastName
        setUserData({ name: fullName, email })
        userData.name === fullName && await setDoc(doc(db, "usuarios", email), userData)
        ToastAndroid.show("Successfully signed up!", ToastAndroid.LONG)
        return true
      }
    } catch (err) {
      ToastAndroid.show("Error, couldn't create account with passed information", ToastAndroid.LONG)
      console.log(err)
    }
    return false
  }


  const loginIn = async (email: string, password: string) => {
    const auth = getAuth()
    try {
      const loginCredentials = await signInWithEmailAndPassword(auth, email, password)
      if (loginCredentials.user.email) {
        const docSnap = await getDoc(doc(db, "usuarios", loginCredentials.user.email))
        if (docSnap.exists()) {
          setUserData({ name: docSnap.data().name, email })
        } else {
          console.log("Error")
        }
        ToastAndroid.show(loginCredentials.user.email, ToastAndroid.LONG)
        return true
      }
    } catch (err) {
      ToastAndroid.show("Error", ToastAndroid.LONG)
    }
    return false
  }


  return (
    <AuthContext.Provider value={{ userData, useCreateUser, loginIn }} >
      {props.children}
    </AuthContext.Provider>
  )
}