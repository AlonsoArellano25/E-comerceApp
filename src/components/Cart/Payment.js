import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import colors from '../../styles/colors'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Payment({ products, selectedAddress, totalPayment }) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log("XD")
            console.log(formData)
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Formas de pagos</Text>

            <TextInput
                label="Nombre de la tarjeta"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput
                label="Numero de la tarjeta"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("number", text)}
                value={formik.values.number}
                error={formik.errors.number}
            />
            <View style={styles.containerInput}>
                <View style={styles.containerMountYearInputs}>
                    <TextInput
                        label="Mes"
                        style={styles.inputDate}
                        onChangeText={(text) => formik.setFieldValue("exp_month", text)}
                        value={formik.values.exp_month}
                        error={formik.errors.exp_month}
                    />
                    <TextInput
                        label="Año"
                        style={styles.inputDate}
                        onChangeText={(text) => formik.setFieldValue("exp_year", text)}
                        value={formik.values.exp_year}
                        error={formik.errors.exp_year}
                    />
                </View>
                <TextInput
                    label="CVV/CVC"
                    style={styles.cvv}
                    onChangeText={(text) => formik.setFieldValue("cvc", text)}
                    value={formik.values.cvc}
                    error={formik.errors.cvc}
                />
            </View>
            <Button mode="contained" contentStyle={styles.btnContent} labelStyle={styles.btnText} onPress={formik.handleSubmit}>
                Pagar {totalPayment && `(s/.${totalPayment})`}
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        name: ""
    }
}

function validationSchema() {
    return {
        number: Yup.string().min(16, true).max(16, true).required(true),
        exp_month: Yup.string().min(1, true).max(2, true).required(true),
        exp_year: Yup.string().min(2, true).max(2, true).required(true),
        cvc: Yup.string().min(3, true).max(3, true).required(true),
        name: Yup.string().min(4, true).required(true),
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 30
    },
    containerTitle: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    containerMountYearInputs: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    inputDate: {
        width: 100,
        marginRight: 10
    },
    cvv: {
        width: '40%'
    },
    btnContent: {
        paddingVertical: 4,
        backgroundColor: colors.primary
    },
    btnText: {
        fontSize: 16
    }
})
