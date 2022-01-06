import React from 'react';
import { AuthNavigationProps } from '../components/Navigation';
import { Container, Box, Text, Button, RoundIconButton, RoundIcon } from '../components';

const SignUpsuccess = ({ navigation }: AuthNavigationProps<"SignUpsuccess">) => {
    const SIZE = 80;

    return(
        <Container pattern={0} footer={
            <Box flexDirection="row" justifyContent="center">
            </Box>
        }>
            <Box alignSelf="center">
                <RoundIcon
                    name="check"
                    size={SIZE}
                    color="primary"
                    backgroundColor="primaryLight"
                />
            </Box>
            <Text variant="title1" textAlign="center" marginVertical="l">your account has been created successfully</Text>
            <Text variant="body" textAlign="center" marginBottom="l">Close this window and login again.</Text>
            <Box alignItems="center" marginTop="m">
                <Button variant="primary" label="Login again" onPress={() => navigation.navigate('Login')} />
            </Box>
        </Container>
    )
}

export default SignUpsuccess;