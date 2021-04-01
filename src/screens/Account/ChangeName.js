import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMeApi, updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'

export default function ChangeName() {

    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                response.name && await formik.setFieldValue("name", response.name)
                response.lastname && await formik.setFieldValue("lastname", response.lastname)
            })()
        }, [])
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                await updateUserApi(auth, formData)
                navigation.goBack()
            } catch (error) {
                Toast.show("Error al actualziar los datos", {
                    position: Toast.positions.CENTER
                })
                setLoading(false)
            }


        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput
                label="Apellidos"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("lastname", text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />
            <Button
                mode="contained"
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombre y apellidos
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        name: "",
        lastname: ""
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
