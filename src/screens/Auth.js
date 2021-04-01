import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import { layoutStyle } from '../styles'
import logo from '../../assets/logo.png'
import RegisterForm from '../components/Auth/RegisterForm'
import LoginForm from '../components/Auth/LoginForm'

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true)

    const changeForm = () => setShowLogin(!showLogin)

    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            <KeyboardAvoidingView>
                {showLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 50,
        resizeMode: "contain",
        marginBottom: 20,
    }
})
