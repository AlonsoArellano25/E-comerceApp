import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import colors from '../../styles/colors'
import { API_URL } from '../../utils/constants'
import { useNavigation } from '@react-navigation/native'
import { deletefavoriteApi } from '../../api/favorite'
import useAuth from '../../hooks/useAuth'

export default function Product({ item, setReload }) {

    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const calcPrice = (price, discount) => {
        if (!discount) return price
        const discountAmount = (price * discount) / 100
        return (price - discountAmount).toFixed(2)
    }

    const goToProduct = (id) => {
        navigation.navigate("product", { idProduct: id })
    }

    const deleteFavorite = async (id) => {
        setLoading(true)
        await deletefavoriteApi(auth, id)
        setReload(true)
        setLoading(false)
    }

    return (
        <View style={styles.product}>
            <View style={styles.containerImage}>
                <Image source={{ uri: `${API_URL}${item.product.main_image.url}` }} style={styles.image} />
            </View>
            <View styles={styles.info}>
                <View>
                    <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                        {item.product.title}
                    </Text>
                    <View style={styles.price}>
                        <Text style={styles.currentPrice}>
                            s/.{calcPrice(item.product.price, item.product.discount)}
                        </Text>
                        {item.product.discount && (
                            <Text style={styles.oldPrice}>s/.{item.product.price}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Button mode="contained" color={colors.primary} onPress={() => goToProduct(item.product._id)}>
                        Ver producto
                    </Button>
                    <IconButton icon="close" color="#fff" size={16} style={styles.btnDelete} onPress={() => deleteFavorite(item.product._id)} />
                </View>
            </View>
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#dadde1"
    },
    containerImage: {
        width: '40%',
        height: 200,
        backgroundColor: "#ebebeb",
        padding: 5
    },
    image: {
        height: '100%',
        resizeMode: 'contain'
    },
    info: {
        padding: 10,
        width: '60%',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16
    },
    price: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-end'
    },
    currentPrice: {
        fontSize: 22
    },
    oldPrice: {
        marginLeft: 7,
        fontSize: 14,
        color: '#747474',
        textDecorationLine: 'line-through'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    btnDelete: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 5,
        width: 60,
        height: 32
    },
    loading: {
        backgroundColor: "#000",
        opacity: 0.4,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center'
    }
})
