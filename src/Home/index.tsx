import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

import { HomeRoutes } from '../components/Navigation';
import Cart from './Cart';
import DrawerContent, { DRAWER_WIDTH } from './Drawer';
import EditProfile from './EditProfile';
import FavoriteOutfits from './FavoriteOutfits';
import DetailsScreen from './Item/DetailsScreen';
import HomeScreen from './Item/HomeScreen';
import OutfitIdeas from './OutfitIdeas/OutfitIdeas';
import Settings from './Settings';
import TransactionHistory from './TransactionHistory';

export { assets } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    drawerStyle={{ width: DRAWER_WIDTH }}
  >
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
    <Drawer.Screen name="EditProfile" component={EditProfile} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="Details" component={DetailsScreen} />
  </Drawer.Navigator>
);
