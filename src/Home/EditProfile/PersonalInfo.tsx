import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';
import CheckboxGroup from './CheckboxGroup';

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

const PersonalInfo = () => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    const getuser = async () => {
      const userToken = await AsyncStorage.getItem('userToken')
      const parsed = JSON.parse(userToken)
      console.log('user', parsed);
      setNama(parsed.nama)
      setEmail(parsed.email)
    };
    getuser()
  },[])
  useEffect(() => {
    console.log('nama',nama)
  },[nama])

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">Account Information</Text>
        <Box marginBottom="m">
          <TextInput
            icon="user"
            placeholder="Name"
            autoCapitalize="none"
            autoCompleteType="name"
            value={nama}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="lock"
            placeholder="Enter your password"
            autoCompleteType="password"
            autoCapitalize="none"
            secureTextEntry
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="map-pin"
            placeholder="Address"
            autoCapitalize="none"
            autoCompleteType="street-address"
          />
        </Box>
        <CheckboxGroup options={genders} radio />
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
