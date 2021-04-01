import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { map } from 'lodash'
import Product from './Product'

export default function FavoriteList({ products, setReload }) {
    return (
        <ScrollView containerStyle={styles.container}>
            <Text style={styles.title}>Lista de favoritos</Text>
            {map(products, (item) => (
                <Product key={item._id} item={item} setReload={setReload} />
            ))}
        </ScrollView>
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
