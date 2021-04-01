import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { getProductCartApi } from '../api/cart'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../components/StatusBar'
import colors from '../styles/colors'
import { useFocusEffect } from '@react-navigation/native'
import ScreenLoading from '../components/ScreenLoading'
import { size } from 'lodash'
import NotProducts from '../components/Cart/NotProducts'
import ProductList from '../components/Cart/ProductList'
import { getAddressesApi } from '../api/address'
import useAuth from '../hooks/useAuth'
import AddressList from '../components/Cart/AddressList'
import Payment from '../components/Cart/Payment'

export default function Cart() {
    const [cart, setCart] = useState(null)
    const [products, setProducts] = useState(null)
    const [reloadCart, setReloadCart] = useState(false)
    const [addresses, setAddresses] = useState(null)
    const { auth } = useAuth()
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)

    useFocusEffect(
        useCallback(
            () => {
                setCart(null)
                setAddresses(null)
                loadCart()
                loadAddresses()
                setSelectedAddress(null)
            },
            [],
        )
    )

    useEffect(() => {
        if (reloadCart) {
            setCart(null)
            loadCart()
            setReloadCart(false)
        }
    }, [reloadCart])

    const loadCart = async () => {
        const response = await getProductCartApi()
        setCart(response)
        console.log(response)
    }

    const loadAddresses = async () => {
        const response = await getAddressesApi(auth)
        setAddresses(response)
    }

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} />
            {!cart ? (
                <ScreenLoading size="large" text="Cargando carrito" />
            ) : size(cart) === 0 ? (
                <NotProducts />
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25}>
                    <ScrollView style={styles.carContainer}>
                        <ProductList cart={cart} products={products} setProducts={setProducts} setReloadCart={setReloadCart} setTotalPayment={setTotalPayment} />
                        <AddressList addresses={addresses} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
                        <Payment products={products} selectedAddress={selectedAddress} totalPayment={totalPayment} />
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    carContainer: {
        padding: 10
    }
})
