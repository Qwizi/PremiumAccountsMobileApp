import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Input, Layout, List, ListItem, Text} from "@ui-kitten/components";
import api from "../Api";
import tokenStorage from "../TokenStorage";

export default function RegisterScreen(props: any) {
    const [usernameValue, setUsernameValue] = useState('');
    const [usernameValidate, setUsernameValidate] = useState<undefined | boolean>(undefined);
    const [usernameErrors, setUsernameErrors] = useState<string[]>([''])

    const [passwordValue, setPasswordValue] = useState('');
    const [passwordValidate, setPasswordValidate] = useState<undefined | boolean>(undefined);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([''])

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [errors, setErrors] = useState<string[]>([''])


    async function registerUser(username: string, password: string) {
        try {
            const response = await api.registerUser(username, password);
            if (response.status === 200) {
                console.log(response.data);
                setErrors(['']);
            }
        } catch (e) {
            console.log(e.response.data);
            if (e.response && e.response.data) {
                setErrors(['', e.response.data.message])
                setButtonDisabled(false);
                setUsernameValidate(false);
                setPasswordValidate(false);
            }
        }
    }

    const UsernameErrorAlert = () => (
        <Card style={styles.card} status={"danger"}>
            {usernameErrors.map(msg => <Text>{msg}</Text>)}
        </Card>
    )

    const PasswordErrorAlert = () => (
        <Card style={styles.card} status={"danger"}>
            {passwordErrors.map(msg => <Text>{msg}</Text>)}
        </Card>
    )

    const ErrorAlert = () => (
        <Card style={styles.card} status={"danger"}>
            {errors.map(msg => <Text>{msg}</Text>)}
        </Card>
    )

    function addUsernameError(errorMsg: string) {
        if (!usernameErrors.find(e => e == errorMsg))
            setUsernameErrors([...usernameErrors, errorMsg]);
    }

    function removeUsernameError(errorMsg: string) {
        setUsernameErrors(usernameErrors.filter(error => error != errorMsg))
    }

    function addPasswordError(errorMsg: string) {
        if (!passwordErrors.find(e => e == errorMsg))
            setPasswordErrors([...passwordErrors, errorMsg]);
    }

    function removePasswordError(errorMsg: string) {
        setPasswordErrors(passwordErrors.filter(error => error != errorMsg))
    }

    async function validateUsernameValue() {
        let validateStatus = false;
        if (usernameValue == '') {
            validateStatus = false
            addUsernameError('Nazwa użytkownika jest wymagana')
        } else {
            validateStatus = true;
            removeUsernameError('Nazwa użytkownika jest wymagana')
        }
        setUsernameValidate(validateStatus)
        return validateStatus;
    }

    async function validatePasswordValue() {
        let validateStatus = false;
        if (passwordValue == '') {
            validateStatus = false
            addPasswordError('Haslo jest wymagane')
        } else {
            validateStatus = true;
            removePasswordError('Haslo jest wymagane')
        }
        setPasswordValidate(validateStatus)
        return validateStatus;
    }

    async function handleClickRegisterBtn() {
        Promise.all([validateUsernameValue(), validatePasswordValue()]).then(async (values) => {
            if (values[0] && values[1]) {
                await registerUser(usernameValue, passwordValue);
            }
        })
    }

    let usernameStatus = '';
    if (usernameValidate) {
        usernameStatus = 'success';
    } else if (!usernameValidate && usernameValidate != undefined) {
        usernameStatus = 'danger';
    }

    let passwordStatus = '';
    if (passwordValidate) {
        passwordStatus = 'success';
    } else if (!passwordValidate && passwordValidate != undefined) {
        passwordStatus = 'danger';
    }

    let usernameErrorAlert;
    if (usernameErrors.length > 1) {
        // @ts-ignore
        usernameErrorAlert = <UsernameErrorAlert/>
    }

    let passwordErrorAlert;
    if (passwordErrors.length > 1) {
        // @ts-ignore
        passwordErrorAlert = <PasswordErrorAlert/>
    }

    let errorAlert;
    if (errors.length > 1) {
        // @ts-ignore
        errorAlert = <ErrorAlert/>
    }

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category='h1' style={{marginBottom: 15}}>Zarejestruj sie</Text>
            {errorAlert}
            {usernameErrorAlert}
            <Input
                placeholder={"Nazwa uzytkownika"}
                value={usernameValue}
                size={'large'}
                status={usernameStatus}
                onChangeText={nextValue => setUsernameValue(nextValue)}
                onBlur={validateUsernameValue}
            />
            {passwordErrorAlert}
            <Input
                placeholder={"Haslo"}
                value={passwordValue}
                size={'large'}
                secureTextEntry={true}
                status={passwordStatus}
                onChangeText={nextValue => setPasswordValue(nextValue)}
                onBlur={validatePasswordValue}
            />
            <Button
                style={{marginTop: '5px'}}
                onPress={handleClickRegisterBtn}
                disabled={buttonDisabled}
            >Zarejestruj
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 2,
        width: '50%'
    },
});