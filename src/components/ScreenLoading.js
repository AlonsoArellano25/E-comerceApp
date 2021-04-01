import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'

export default function ScreenLoading({ text, size, color }) {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={size} color={color} style={styles.loading} />
            <Text style={styles.title}>{text}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loading: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18
    }
})

ScreenLoading.defaultProps = {
    text: "Cargando...",
    color: "#000"
}
