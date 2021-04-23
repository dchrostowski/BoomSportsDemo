import React, { useState } from "react";
import { Text, StyleSheet, Button, View, Image } from "react-native";
import InputSpinner from 'react-native-input-spinner'

const styles = StyleSheet.create({
  navView: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  baseText: {
    fontFamily: "Cochin",
    color: "white",
    textAlign: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: "bold",
    color: "white"
  },
});

export default function Home(props) {
  const [tweets,setTweets] = useState(100)
  return (
    <View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      }}>
        <Image source={require('../../images/nfl-twitter.jpg')} />
      </View>
      <View style={{marginTop:200, marginLeft:50, marginRight:50, alignItems:"center", justifyContent:"center"}}>
      <Text>Tweets to analyze</Text>
      <InputSpinner
          max={15000}
          min={100}
          step={100}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={tweets}
          onChange={(num) => {
            setTweets(num)
          }}
        />
      </View>
      <View style={styles.navView}>
        
        
        <Button
          title="Analyze tweets"
          style={{marginTop:100}}
          onPress={() => props.navigation.navigate('Results', {numTweets:tweets})}
        />
      </View>
    </View>
  )

}
