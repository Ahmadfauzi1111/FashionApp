import React, { useRef, SyntheticEvent } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useFormik } from 'formik';

import { Container, Button, Text, Box } from '../components';
import { AuthNavigationProps } from '../components/Navigation';
import TextInput  from '../components/Form/TextInput';
import Footer from './components/Footer';
import axios, { AxiosError } from 'axios';
import { CommonActions } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    nama: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().equals([Yup.ref('password')], "Passwords don't match").required('Required')
});

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(SignUpSchema),
        mode: "all",
    });
    const onSubmit = async (data)=> {
        await axios.post('http://192.168.1.4:3000/api/register', {
            nama: data.nama,
            email: data.email,
            password: data.password,
            password_confirm: data.confirmPassword,
        });
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [{ name: "SignUpsuccess" }],
            })
        )
    };
    const password = useRef<RNTextInput>(null);
    const confirmPassword = useRef<RNTextInput>(null);
    const footer = <Footer title="Already have an account?" action="Login here" onPress={() => navigation.navigate('Login')} />

    return (
        <Container pattern={1} {...{footer}}>
            <Text variant="title1" textAlign="center" marginBottom="l">Create account</Text>
            <Text variant="body" textAlign="center" marginBottom="l">
                Let us know your email and password.
            </Text>
            <Box>
                <Box marginBottom="m">
                <Controller
                control={control}
                name="nama"
                render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, error },
                }) => (
                    <TextInput
                    icon="lock"
                    placeholder="Enter your username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={error}
                    touched={isTouched}
                    autoCompleteType="name"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    onSubmitEditing={() => password.current?.focus()}
                    />
                )}
                />
                </Box>
                <Box marginBottom="m">
                    <Controller
                    control={control}
                    name="email"
                    render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isTouched, error },
                    }) => (
                        <TextInput
                        icon="mail"
                        placeholder="Enter your email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={error}
                        touched={isTouched}
                        autoCompleteType="email"
                        returnKeyType="next"
                        returnKeyLabel="next"
                        onSubmitEditing={() => password.current?.focus()}
                        />
                    )}
                    />
                </Box>
                <Box marginBottom="m">
                <Controller
                    control={control}
                    name="password"
                    render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isTouched, error },
                    }) => (
                        <TextInput
                        ref={password}
                        icon="lock"
                        placeholder="Enter your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={error}
                        touched={isTouched}
                        autoCompleteType="password"
                        returnKeyType="next"
                        returnKeyLabel="next"
                        onSubmitEditing={() => confirmPassword.current?.focus()}
                        secureTextEntry
                        />
                    )}
                    />
                </Box>
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isTouched, error },
                    }) => (
                        <TextInput
                        ref={confirmPassword}
                        icon="lock"
                        placeholder="Confirm your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={error}
                        touched={isTouched}
                        autoCompleteType="password"
                        returnKeyType="next"
                        returnKeyLabel="next"
                        onSubmitEditing={() => handleSubmit()}
                        secureTextEntry
                        />
                    )}
                    />
                <Box alignItems="center" marginTop="m">
                    <Button variant="primary" label="Create your account" onPress={handleSubmit(onSubmit)} />
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp;