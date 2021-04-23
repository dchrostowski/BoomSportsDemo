import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, View, FlatList } from "react-native";
import apiRequest from '../../util/api'
import { profileImageIcon, profileLink } from '../../util/util'





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
    const [numTweets, setTweets] = useState(route.params.numTweets)
    const [tweetsAnalyzed, setTweetsAnalyzed] = useState(0)
    const tableHeader = ["Rank", "Profile Image", "Handle", "# of Followers"]
    const [tableData, setTableData] = useState([])
    const [renderTable, setRenderTable] = useState(false)
    


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

        for (let i = 0; i < numRequests; i++) {
            let resp
            try {
                resp = await apiRequest(seed_tweets.path, seed_tweets.params)
                let user_ids_checked = []
                // according to the official rules of the internet, you must have a blue checkmark to be famous
                let verified = resp.data.statuses.filter(tweet => tweet.user.verified)
                verified.forEach(person => {
                    legitFamousPeople[person.user.id] = person
                })
            }
            catch (err) {
                console.log("Error ocurrred on request:")
                console.log(err.response.data)

                process.exit(1)
            }


            // increment to the next result of popular tweets
            seed_tweets.params['max_id'] = resp.data.search_metadata.next_results.match(/max_id=(\d+)/)[1]
            setTweetsAnalyzed((i + 1) * 100)

        }
        //remove any duplicates
        return Object.values(legitFamousPeople)

    }

    const getTopFiveFamousNFLTweeters = function (numRequests) {
        getLegitFamousPeople(numRequests).then((famousPeople) => {

            famousPeople.sort((a, b) => b.user.followers_count - a.user.followers_count)
            let lastIdx = 5
            if (famousPeople.length < 5) lastIdx = famousPeople.length
            famousPeople = famousPeople.slice(0, lastIdx)
            let rank = 1
            let userData = []
            famousPeople.forEach((person) => {

                console.log(`${rank}: twitter handle: ${person.user.screen_name} | name: ${person.user.name} | followers: ${person.user.followers_count}`)

                userData.push({
                    rank: rank,
                    profileImage: person.user.profile_image_url,
                    profileUrl: person.user.url,
                    handle: person.user.screen_name,
                    name: person.user.name,
                    followers: person.user.followers_count
                })
                rank++
            })


            
            for (let i = 0; i < userData.length; i++) {
                console.log(tu)
                let tu = userData[i]
                let profImg = profileImageIcon(tu.profileImage)
                let profLink = profileLink(tu.handle, tu.profileLink)
                setTableData(prevData => [...prevData, {key:tu.handle, ...userData[i]}])
            }




        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        const numberRequests = numTweets / 100
        setTableData([])
        getTopFiveFamousNFLTweeters(numberRequests)

    }, [])






    if (tweetsAnalyzed < numTweets) {
        return (
            <View>
                <View>
                    <Text style={styles.titleText}>
                        Analyzing {tweetsAnalyzed} of {numTweets} tweets...
                    </Text>
                </View>
            </View>
        )

    }
    else {

        const fuckingData = [
            {
                "key": "TheSource",
                "displayData": "1, TheSource, 695726 followers"
            },
            {
                "key": "Local12",
                "displayData": "2, Local12, 200964 followers"
            },
            {
                "key": "JeffRatcliffe",
                "displayData": "3, JeffRatcliffe, 77832 followers"
            }
        ]
        return (
                <View style={styles.container}>
                    <FlatList data={tableData}
                    renderItem={({item}) => { 
                        return (
                        <View style={{flexDirection:"row"}}>
                        <Text style={styles.item}>{item.rank}.</Text>
                        {profileLink(item.handle,item.profileUrl)}
                        <Text style={styles.item}>{item.followers} followers</Text>
                        </View>)
                    }
                    }/>
                </View>
        )
    }


}
