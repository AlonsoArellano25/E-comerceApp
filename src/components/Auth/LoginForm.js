import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import Toast from 'react-native-root-toast'
import { loginApi } from '../../api/user'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'

export default function LoginForm({ changeForm }) {

    const [loading, setLoading] = useState(false)
    const { login } = useAuth()


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                const response = await loginApi(formData)
                if (response.statusCode) {
                    throw "Error al ingresar"
                }
                login(response)
            } catch (error) {
                Toast.show("Error al ingresar", {
                    position: Toast.positions.CENTER
                })
                setLoading(false)
            }
        }
    })

    return (
        <View>
            <TextInput
                label="Email o Username"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput
                label="Contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button mode="contained" style={formStyle.btnSucces} onPress={formik.handleSubmit} loading={loading}>
                Entrar
            </Button>
            <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={changeForm}>
                Registrarse
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({})
