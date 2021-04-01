import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { decreaseProductApi, deleteProductCartApi, increaseProductCartApi } from '../../api/cart'
import colors from '../../styles/colors'
import { API_URL } from '../../utils/constants'

export default function Product({ product, setReloadCart }) {

    const calcPrince = (price, discount) => {
        if (!discount) return price

        const discountAmount = (price * discount) / 100

        return (price - discountAmount).toFixed(2)
    }

    const deleteProductCart = async () => {
        const response = await deleteProductCartApi(product._id)
        console.log(response)
        if (response) setReloadCart(true)
    }

    const increaseProductCart = async () => {
        const response = await increaseProductCartApi(product._id)
        if (response) setReloadCart(true)
    }

    const decreaseProductCart = async () => {
        const response = await decreaseProductApi(product._id)
        if (response) setReloadCart(true)
    }

    return (
        <View style={styles.product}>
            <View style={styles.containerImage}>
                <Image style={styles.image} source={{ uri: `${API_URL}${product.main_image.url}` }} />
            </View>
            <View style={styles.info}>
                <View>
                    <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{product.title}</Text>
                    <View style={styles.prices}>
                        <Text style={styles.currentPrice}> s/.{calcPrince(product.price, product.discount)} </Text>
                    </View>
                </View>
                <View style={styles.btnsContainer}>
                    <View style={styles.selectQuantity}>
                        <IconButton icon="plus" color="#fff" size={19} style={styles.btnQuantity} onPress={increaseProductCart} />
                        <TextInput style={styles.inputQuantity} value={product.quantity.toString()} />
                        <IconButton icon="minus" color="#fff" size={19} style={styles.btnQuantity} onPress={decreaseProductCart} />
                    </View>
                    <Button color="#b12704" mode="contained" onPress={deleteProductCart}>
                        Eliminar
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        borderRadius: 0.5,
        borderColor: "#dadde1"
    },
    containerImage: {
        width: "40%",
        height: 170,
        backgroundColor: "#ebebeb",
        padding: 5
    },
    image: {
        height: "100%",
        resizeMode: "contain"
    },
    info: {
        padding: 10,
        width: "60%",
        justifyContent: "space-between"
    },
    name: {
        fontSize: 16
    },
    prices: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-end'
    },
    currentPrice: {
        fontSize: 18,
        color: "#b17201"
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%'
    },
    selectQuantity: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnQuantity: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 0
    },
    inputQuantity: {
        paddingHorizontal: 5,
        fontSize: 16
    }
})
