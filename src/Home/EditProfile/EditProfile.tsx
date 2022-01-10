import { DrawerActions } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

import { Box, Header, Text, useTheme } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { AuthContext } from '../../context/context';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';
import Tabs from './Tabs';

const { width } = Dimensions.get("window");
const tabs = [
  { id: "config", title: "Configuration" },
  { id: "info", title: "Personal Info" },
];

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const theme = useTheme();
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
  const picture = {
    src: require('../Drawer/assets/1.png'),
    width: 100,
    height: 100,
  }

  return (
    <Box flex={1} backgroundColor="background">
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
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>
      <Box>
        <Image
            source={picture.src}
            style={{
              width: width - theme.borderRadii.xxl,
              height: ((width - theme.borderRadii.xxl) * picture.height) / picture.width,
              top: -30,
              left: 145,
              borderRadius: theme.borderRadii.xl
            }}
          />
        <Box marginVertical="m" style={{ marginTop: -30 }}>
          <Text variant="title1" textAlign="center">
            {nama}
          </Text>
          <Text variant="body" textAlign="center">
            {email}
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <Configuration />
        <PersonalInfo />
      </Tabs>
    </Box>
  );
};

export default EditProfile;
