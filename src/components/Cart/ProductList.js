import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import ScreenLoading from '../../components/ScreenLoading'
import { getProductApi } from '../../api/product'
import Product from './Product'

export default function ProductList({ cart, setProducts, products, setReloadCart, setTotalPayment }) {

    useEffect(() => {
        (async () => {
            setProducts(null)
            const pructTemp = []
            let totalPaymentTemp = 0
            for await (const product of cart) {
                const response = await getProductApi(product.idProduct)
                response.quantity = product.quantity
                pructTemp.push(response)

                totalPaymentTemp += response.price * response.quantity
            }
            setProducts(pructTemp)
            setTotalPayment(totalPaymentTemp)
        })()
    }, [])

    return (
        <View>
            <Text style={styles.title}>Productos: </Text>
            {!products ? (
                <ScreenLoading text="Cargando carrito" size="large" />
            ) : (
                map(products, (product) => (
                    <Product key={product._id} product={product} setReloadCart={setReloadCart} />
                ))
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
