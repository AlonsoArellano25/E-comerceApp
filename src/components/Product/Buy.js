import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import { addProductCartApi, getProductCartApi } from '../../api/cart'

export default function Buy({ product, quantity }) {

    useEffect(() => {
        (async () => {
            const response = await getProductCartApi()
            console.log(response)
        })()
    }, [])

    const addProductCart = async () => {
        const response = await addProductCartApi(product._id, quantity)
        console.log(response)

        if (response) {
            Alert.alert("Producto añadido al carrito")
        } else {
            Alert.alert("Error al añadir el producto al carrito")
        }
    }

    return (
        <View style={{ zIndex: 1 }}>
            <Button mode="contained" contentStyle={styles.btnBuyContent} labelStyle={styles.btnLabel} style={styles.btn} onPress={addProductCart}>
                Añadir a la cesta
        </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBuyContent: {
        backgroundColor: "#008fe9",
        paddingVertical: 5
    },
    btnLabel: {
        fontSize: 18
    },
    btn: {
        marginTop: 20
    }
})
