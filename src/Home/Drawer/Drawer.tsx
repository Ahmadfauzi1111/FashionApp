import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

import { Box, Header, Text, useTheme } from '../../components';
import { AuthContext } from '../../context/context';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

export const assets = [require("./assets/drawer.png")];
const { width } = Dimensions.get('window');
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 769 / 1531;
const height = DRAWER_WIDTH * aspectRatio;

const Drawer = () => {
  const { sigOut } = useContext(AuthContext);
  const items: DrawerItemProps[] = [
    { icon: "zap", label: "Outfit Ideas", screen: "OutfitIdeas", color: "primary" },
    { icon: "heart", label: "Favorite Outfits", screen: "FavoriteOutfits", color: "drawer1" },
    { icon: "star", label: "Item", screen: "HomeScreen", color: "info" },
    { icon: "user", label: "Edit Profile", screen: "EditProfile", color: "drawer2" },
    { icon: "clock", label: "Transaction History", screen: "TransactionHistory", color: "drawer3" },
    { icon: "settings", label: "Notification Settings", screen: "Settings", color: "drawer4" },
    { icon: "log-out", label: "Logout",
      onPress: (navigation) => {
        sigOut()
    }
      , color: "secondary"
    },
  ]
  const picture = {
    src: require('./assets/1.png'),
    width: 150,
    height: 150,
  }
  const theme = useTheme();
  const navigation = useNavigation();
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const {getUser} = useContext(AuthContext)
  useEffect(() => {
    const getuser = async () => {
      const userToken = await getUser()
      setNama(userToken.nama)
      setEmail(userToken.email)
    };
    getuser()
  },[])

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Menu"
            left={{ icon: 'x', onPress: () => navigation.dispatch(DrawerActions.closeDrawer()) }}
            right={{ icon: 'shopping-bag', onPress: () => navigation.navigate("Cart") }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary"/>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          backgroundColor="background"
          justifyContent="center"
          padding="xl"
        >
          <Box 
            position="absolute" 
            left={DRAWER_WIDTH / 2 - 45} 
            top={-50} 
            // backgroundColor="primary"
            style={{ borderRadius: 50 }}
            width={90}
            height={90}
          >
            <Image 
            source={picture.src}
            style={{ 
              width: width - theme.borderRadii.xxl, 
              height: ((width - theme.borderRadii.xxl) * picture.height) / picture.width,
              top: -18,
              left: -15,
              borderRadius: theme.borderRadii.xl
            }}
          />
          </Box>
          <Box>
            <Text variant="title1" marginTop="xxl" textAlign="center">{nama}</Text>
            <Text variant="body1" textAlign="center">{email}</Text>
          </Box>
          {items.map(item => <DrawerItem key={item.icon} {...item} />)}
        </Box>
      </Box>
      <Box
        backgroundColor="background"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.61}
      >
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl
          }}
        />
      </Box>
    </Box>
  )
}

export default Drawer;