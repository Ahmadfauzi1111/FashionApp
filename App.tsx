import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/components/Theme';

import { LoadAssets } from './src/components';
import { AppRoutes } from './src/components/Navigation';
import { AuthenticationNavigator, assets as authAssets } from './src/Authentication';
import { HomeNavigator, assets as homeAssets } from './src/Home';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './src/context/context';


const assets = [...authAssets, ...homeAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

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
    sigIn: (email, password) => {
      // setUserToken('abcd'),
      // setIsLoading(false)
      let userToken;
      userToken = null;
      if( email=== 'A@gmail.com' && password=== 'pass' ){
        userToken = 'abcd'
      }
      console.log(email, password);
      console.log('user token', userToken)
      dispatch({ type: 'LOGIN', id: email, token: userToken })
    },
    sigOut: () => {
      // setUserToken(null),
      // setIsLoading(false)
      dispatch({ type: 'LOGOUT' })
    },
    sigUp: () => {
      setUserToken('abcd'),
      setIsLoading(false)
    },
  }), [])

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false)
      dispatch({ type: 'RETRIEVE_TOKEN', token: 'abcd' })
    }, 1000)
  }, [])

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
            { loginState.userToken !== null ? (
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