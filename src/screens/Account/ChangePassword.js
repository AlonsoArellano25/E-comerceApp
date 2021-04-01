import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'
import { getMeApi, updateUserApi } from '../../api/user'


export default function ChangePassword() {

    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { auth, logout } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                const response = await updateUserApi(auth, formData)
                if (response.statusCode) throw "Error al cambiar la contraseña"
                navigation.goBack()

            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
            }
            setLoading(false)
        }
    })
    return (
        <View style={styles.container}>
            <TextInput
                label="Nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput
                label="Repetir nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button mode="contained" style={formStyle.btnSucces} onPress={formik.handleSubmit} loading={loading}>
                Cambiar contraseña
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        password: '',
        repeatPassword: ''
    }
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")], true)
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})
