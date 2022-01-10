import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { assets as authAssets, AuthenticationNavigator } from './src/Authentication';
import { LoadAssets } from './src/components';
import { AppRoutes } from './src/components/Navigation';
import { ThemeProvider } from './src/components/Theme';
import { AuthContext } from './src/context/context';
import { assets as homeAssets, HomeNavigator } from './src/Home';


const assets = [...authAssets, ...homeAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':

        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    sigIn: async (email, password) => {
      let res;
      try {
          res = await axios.post('http://192.168.1.5:3000/api/login', {
          email,
          password
        });
      } catch (error) {

      }
      if(res?.status === 201){
        await AsyncStorage.setItem('userToken', JSON.stringify(res.data));
        const userToken = await AsyncStorage.getItem('userToken')
        dispatch({ type: 'LOGIN', id: email, token: userToken })
      }
    },
    sigOut: async () => {
      let res;
      try {
          res = await axios.post('http://192.168.1.5:3000/api/logout');
          if(res?.status === 201){
            await AsyncStorage.removeItem('userToken');
            dispatch({ type: 'LOGOUT' })
          }
      } catch (error) {
      }
    },
    getUser: async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken')
        return userToken ? JSON.parse(userToken) : {};
      } catch (error) {
        console.log(error);
      }
    },
  }), [])

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
if(loginState.isLoading){
  return(
    <View style={{ flex:1, justifyContent: "center", alignItems:"center" }}>
        <ActivityIndicator size="large" />
    </View>
  )
}

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator headerMode="none">
            { loginState.userToken === null ? (
              <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            ) : (
              <AppStack.Screen name="Home" component={HomeNavigator} />
            )}
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
    </AuthContext.Provider>
  );
}