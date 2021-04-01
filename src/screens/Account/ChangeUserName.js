import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { formStyle } from '../../styles'
import useAuth from '../../hooks/useAuth'
import { getMeApi, updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'

export default function ChangeUserName() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                await formik.setFieldValue("username", response.username)
            })()
        }, [],
        )
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                const response = await updateUserApi(auth, formData)
                if (response.statusCode) throw "vete a la mrd"
                navigation.goBack()
            } catch (error) {
                Toast.show("vt a la mrd", {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("username", true)
                setLoading(false)
            }

        }
    })

    return (
        <View style={styles.content}>
            <TextInput
                label="Nombre de usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button mode="contained" style={formStyle.btnSucces} loading={loading} onPress={formik.handleSubmit}>
                Cambiar nombre de usuario
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        username: ""
    }
}

function validationSchema() {
    return {
        username: Yup.string().min(4, true).required(true)
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
    }
})
