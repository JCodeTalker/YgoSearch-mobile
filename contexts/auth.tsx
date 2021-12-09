import { doc, getDoc, setDoc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { createContext, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import { db } from "../firebase/firebase";
import { cardType } from "../types";


type ProviderProps = {
  children: ReactNode
}

export type UserDataType = {
  name: string,
  email: string,
  cardList?: cardType[]
}

type AuthContextValues = {
  userData: UserDataType,
  setUserData: Dispatch<SetStateAction<UserDataType>>
  useCreateUser: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>,
  loginIn: (email: string, password: string) => Promise<boolean>
}


export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)


export function AuthContextProvider(props: ProviderProps) {

  const [userData, setUserData] = React.useState({} as UserDataType)

  async function useCreateUser(email: string, password: string, firstName: string, lastName: string) {
    const auth = getAuth()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user.email) {
        const fullName = firstName + " " + lastName
        setUserData({ name: fullName, email })
        userData.name === fullName && await setDoc(doc(db, "usuarios", email), userData)
        // ToastAndroid.show("Successfully signed up!", ToastAndroid.LONG)
        return true
      }
    } catch (err) {
      // ToastAndroid.show("Error, couldn't create account with passed information", ToastAndroid.LONG)
      console.log(err)
    }
    return false
  }

  async function authListener(email: string) {
    const docRef = doc(db, "usuarios", email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUserData(docSnap.data() as UserDataType)
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) { //user is signed in
        const { email } = user
        if (!email) {
          throw new Error("Missing information from provider");
        }

        try {
          authListener(email)
        } catch (err) {
          console.log(err)
        }
      }
    })

    return () => {
      unsubscribe(); // disable event listener
    }
  }, [])


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
        // ToastAndroid.show(loginCredentials.user.email, ToastAndroid.LONG)
        return true
      }
    } catch (err) {
      // ToastAndroid.show("Error", ToastAndroid.LONG)
    }
    return false
  }


  return (
    <AuthContext.Provider value={{ userData, setUserData, useCreateUser, loginIn }} >
      {props.children}
    </AuthContext.Provider>
  )
}