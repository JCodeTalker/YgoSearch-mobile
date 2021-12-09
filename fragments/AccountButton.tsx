import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  text: string,
  buttonListener: () => void
}

export function AccountButton(props: ButtonProps) {
  return (
    <Pressable onPressOut={props.buttonListener} style={{ display: "flex", paddingHorizontal: 100, justifyContent: 'center' }} >
      <Text style={styles.signInButton} > {props.text} </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  signInButton: {
    fontWeight: 'bold',
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#ff3300",
    color: "white",
    borderRadius: 20,
    marginTop: 20,
  }
})