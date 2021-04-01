import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Search from '../components/search/Search'
import StatusBarCustom from '../components/StatusBar'
import colors from '../styles/colors'
import { getFavoriteApi } from '../api/favorite'
import useAuth from '../hooks/useAuth'
import ScreenLoading from '../components/ScreenLoading'
import { size } from 'lodash'
import FavoriteList from '../components/Favorites/FavoriteList'


export default function Favorites() {
    const [products, setProducts] = useState(null)
    const [reload, setReload] = useState(false)

    const { auth } = useAuth()

    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    const response = await getFavoriteApi(auth)
                    setProducts(response)
                })()
                setReload(false)
            },

            [reload],
        )
    )

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} />
            <Search />
            {!products ? (
                <ScreenLoading text="Cargando lista" />
            ) : size(products) === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Lista de Favorios</Text>
                    <Text>No tienes productos en tu lista</Text>
                </View>
            ) : (
                <FavoriteList products={products} setReload={setReload} />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 5
    }
})
