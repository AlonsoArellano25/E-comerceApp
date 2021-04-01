import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import { registerApi } from '../../api/user'
import { formStyle } from '../../styles'

export default function RegisterForm({ changeForm }) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await registerApi(formData)
                changeForm()
            } catch (error) {
                setLoading(false)
                Toast.show("Error al registrar el usuario", {
                    position: Toast.positions.CENTER
                })
            }
        }
    })

    return (
        <View>
            <TextInput
                label="Email"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput
                label="Nombre de usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput
                label="Contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput
                label="Repetir contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatpassword", text)}
                value={formik.values.repeatpassword}
                error={formik.errors.repeatpassword}
            />
            <Button mode="contained" style={formStyle.btnSucces} onPress={formik.handleSubmit} loading={loading} >
                Registrarse
            </Button>
            <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={changeForm} >
                Iniciar sesión
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatpassword: "",
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatpassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
}

const styles = StyleSheet.create({})
