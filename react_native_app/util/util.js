import React from 'react'
import { Text, Linking, Image } from "react-native";

export function profileImageIcon(imageUrl) {
    return (
        <Image source={{url:imageUrl}}/>
        )
}

export function profileLink(handle) {

    return (
        <Text style={{color:'blue',padding: 10, fontSize: 18,
        height: 44,}} onPress={() => Linking.openURL(`https://twitter.com/${handle}`)}>{handle}</Text>
    )
}
