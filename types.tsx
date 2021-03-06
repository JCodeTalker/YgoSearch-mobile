/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  SignIn: undefined;
  SignUp: undefined;
  NotFound: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  CardSearch: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  Login: undefined;
  SignUp: undefined;
  WishList: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type cardType = {
  name: string,
  race: string,
  desc: string,
  attribute: string,
  level: number,
  atk: number,
  def: number,
  type: string,
  card_images: {
    id: number,
    image_url: string,
    image_url_small: string
  }[],
  id: number,
  archetype: string
}