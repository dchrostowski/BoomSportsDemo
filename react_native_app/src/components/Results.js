import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, View } from "react-native";
import apiRequest from '../../util/api'





const styles = StyleSheet.create({
  navView: {
    marginTop: 200
  },
  baseText: {
    fontFamily: "Cochin",
    color: "black",
    textAlign: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});



export default function Results({route, navigation})  {
    const [numTweets,setTweets] = useState(route.params.numTweets)
    const [tweetsAnalyzed, setTweetsAnalyzed] = useState([],0)
    const [top5,setTop5] = useState([])


    async function getLegitFamousPeople(numRequests) {
        console.log("call to getLegitFamousPeople")
        let legitFamousPeople = {}
    
        let seed_tweets = {
            path: '/1.1/search/tweets.json',
            params: {
                q: '#nfl',
                count: 100,
                include_entities: true,
                max_id: null
            }
        }
    
        for(let i = 0; i < numRequests; i++) {
            let resp
            try {
                resp = await apiRequest(seed_tweets.path,seed_tweets.params)
                let user_ids_checked = []
                // according to the official rules of the internet, you must have a blue checkmark to be famous
                let verified = resp.data.statuses.filter(tweet => tweet.user.verified )
                verified.forEach(person => {
                    legitFamousPeople[person.user.id] = person
                })
            }
            catch(err) {
                console.log("Error ocurrred on request:")
                console.log(err.response.data)
    
                process.exit(1)
            }
    
    
            // increment to the next result of popular tweets
            seed_tweets.params['max_id'] = resp.data.search_metadata.next_results.match(/max_id=(\d+)/)[1]
            setTweetsAnalyzed((i+1)*100)
            
        }
        //remove any duplicates
        return Object.values(legitFamousPeople)
        
    }

    const getTopFiveFamousNFLTweeters = function(numRequests) {
        getLegitFamousPeople(numRequests).then((famousPeople) => {
            famousPeople.forEach((person) => {
            })
            
            famousPeople.sort((a,b) => b.user.followers_count - a.user.followers_count )
            let lastIdx = 5
            if (famousPeople.length < 5) lastIdx = famousPeople.length
            famousPeople = famousPeople.slice(0,lastIdx)
            let rank = 1
            let peopleList = []
            famousPeople.forEach((person) => {
                console.log(`twitter handle: ${rank}: ${person.user.screen_name} | name: ${person.user.name} | followers: ${person.user.followers_count}`)
                peopleList.push(`${rank}. ${person.user.screen_name}`)
                rank++
            })
    
            setTop5(peopleList)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const numberRequests = numTweets / 100
        getTopFiveFamousNFLTweeters(numberRequests)
    },[])
    
    

  

  

  return (
    <View>
    <View>
    <Text style={styles.titleText}>
      Analyzing {tweetsAnalyzed} of {numTweets} tweets...
    </Text>
  </View>
    
    <View style={styles.navView}>
    
    </View>
    </View>
  )

}
