import React from 'react'
import { Text, Linking, Image, View } from "react-native";

// these are helper functions for rendering some of the data nicely

export function profileImageIcon(imageUrl) {
    return (
        <Image style={{height:50,width:50}} source={{uri:imageUrl}}/>
        )
}

export function profileLink(handle) {

    return (
        <Text style={{color:'blue',padding: 10, fontSize: 18,
        height: 44,}} onPress={() => Linking.openURL(`https://twitter.com/${handle}`)}>@{handle}</Text>
    )
}

export function renderSeparator() {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};  
