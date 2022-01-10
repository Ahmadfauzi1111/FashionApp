import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { Box, Button, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';
import { AuthContext } from '../../context/context';

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]


const PersonalInfo = () => {
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
            icon="mail"
            placeholder="Enter your email"
            autoCompleteType="email"
            autoCapitalize="none"
            value={email}
          />
        </Box>
        {/* <Box marginBottom="m">
          <TextInput
            icon="map-pin"
            placeholder="Address"
            autoCapitalize="none"
            autoCompleteType="street-address"
          />
        </Box> */}
        {/* <CheckboxGroup options={genders} radio /> */}
        <Box alignItems="center" marginBottom="s">
        <Button
            variant="primary"
            label="Edit"
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
