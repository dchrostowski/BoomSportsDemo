import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, View, FlatList } from "react-native";
import apiRequest from '../../util/api'
import { profileImageIcon, profileLink, renderSeparator } from '../../util/util'

const styles = StyleSheet.create({

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
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});



export default function Results({ route, navigation }) {
    // Number of tweets that will be analyzed
    const [numTweets, setTweets] = useState(route.params.numTweets)
    // number of tweets analyzed so far
    const [tweetsAnalyzed, setTweetsAnalyzed] = useState(0)
    // twitter data returned from the APIs gets stored in this state variable
    const [tableData, setTableData] = useState([])


    // This will just return every verified twitter user that has used #nfl in any of the tweets being analyzed
    async function getLegitFamousPeople(numRequests) {
        let legitFamousPeople = {}
        // pulls most popular historical tweets with #nfl
        let seed_tweets = {
            path: '/1.1/search/tweets.json',
            params: {
                q: '#nfl',
                count: 100,
                max_id: null
            }
        }

        for (let i = 0; i < numRequests; i++) {
            let resp
            try {
                resp = await apiRequest(seed_tweets.path, seed_tweets.params)


                // filter out anyone who isn't verified.  you can't be famous without a blue checkmark
                let verified = resp.data.statuses.filter(tweet => tweet.user.verified)

                // This keeps the results unique
                verified.forEach(person => {
                    legitFamousPeople[person.user.id] = person
                })
            }
            catch (err) {
                console.log("Error ocurrred on request:")
                console.log(err.response.data)
                process.exit(1)
            }


            // increment to the next result of tweets
            seed_tweets.params['max_id'] = resp.data.search_metadata.next_results.match(/max_id=(\d+)/)[1]
            // upate the state showing the progress
            setTweetsAnalyzed((i + 1) * 100)

        }
        //removes any duplicate famous people that we found (keys are set to user's id)
        return Object.values(legitFamousPeople)

    }

    const getTopFiveFamousNFLTweeters = function (numRequests) {
        getLegitFamousPeople(numRequests).then((famousPeople) => {
            // famousPeople is an array of Twitter user objects that we found in our sample of NFL tweets

            // sort them by their follower count
            famousPeople.sort((a, b) => b.user.followers_count - a.user.followers_count)
            let lastIdx = 5
            // lower our results to what we have in case we couldn't find 5 famous people
            if (famousPeople.length < 5) lastIdx = famousPeople.length

            // Only keep the top 5 who have the most followers
            famousPeople = famousPeople.slice(0, lastIdx)
            let rank = 1


            famousPeople.forEach((person) => {
                // pull out relevant/pertinent user data from the twitter user objects

                let userData = {
                    rank: rank,
                    key: person.user.screen_name,
                    followers: person.user.followers_count,
                    name: person.user.name,
                    profileImageUrl: person.user.profile_image_url
                }
                // update the state variable which contains our top 5
                setTableData(prevData => [...prevData, userData])
                rank++
            })
        })
            .catch((err) => {
                console.log(err)
            })
    }

    // equivalent to componentDidMount, prevents infinite re-renders
    useEffect(() => {
        // 100 tweets per request
        const numberRequests = numTweets / 100
        // data that will be rendered
        setTableData([])
        // will kick off the API requests and update state accordingly
        getTopFiveFamousNFLTweeters(numberRequests)

    }, [])





    // Show progress while we wait for all API requests to complete
    if (tweetsAnalyzed < numTweets) {
        return (
            <View>
                <Text style={styles.titleText}>
                    Analyzing {tweetsAnalyzed} of {numTweets} tweets...
                </Text>
            </View>
        )

    }
    else {
        return (
            // render data to a simple FlatList component
            <View style={styles.container}>
                {renderSeparator()}
                <FlatList data={tableData}
                    renderItem={({ item }) => {
                        // render
                        return (
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.item}>{item.rank}.</Text>
                                {profileImageIcon(item.profileImageUrl)}
                                {profileLink(item.key)}
                                <Text style={styles.item}>{item.followers} followers</Text>
                            </View>)
                    }
                    }
                    ItemSeparatorComponent={renderSeparator}  
                    />
            {renderSeparator()}        
            </View>
            
        )
    }


}
