import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { isFavoriteApi, addFavoriteApi, deletefavoriteApi } from '../../api/favorite'
import useAuth from '../../hooks/useAuth'
import { size } from 'lodash'

export default function Favorite({ product }) {

    const [isFavorite, setIsFavorite] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product._id)
            if (size(response) === 0) setIsFavorite(false)
            else setIsFavorite(true)
        })()
    }, [product])

    const AddFavorites = async () => {
        if (!loading) {
            setLoading(true)

            try {
                await addFavoriteApi(auth, product._id)
                setIsFavorite(true)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

    }

    const deleteFavorites = async () => {
        if (!loading) {
            setLoading(true)
            try {
                await deletefavoriteApi(auth, product._id)
                setIsFavorite(false)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }

    if (isFavorite === undefined) return null

    return (
        <View style={{ zIndex: 1 }}>
            <Button loading={loading} mode="contained" contentStyle={isFavorite ? styles.btnFavoritesDelete : styles.btnFavorites} labelStyle={styles.btnLabel} style={styles.btn} onPress={isFavorite ? deleteFavorites : AddFavorites}>

                {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnFavorites: {
        backgroundColor: "#057b00",
        paddingVertical: 5
    },
    btnFavoritesDelete: {
        backgroundColor: "#c40000",
        paddingVertical: 5
    },
    btnLabel: {
        fontSize: 18
    },
    btn: {
        marginTop: 20
    }
})
