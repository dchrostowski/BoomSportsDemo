
import apiRequest from './util.js'


// I dreamed too big and got execited by all the new v2.0 api features
// for another time...
/*
const generateUserLookup = ((author_ids) => {
    return null
})

const generateTweetLookup = ((tweet_ids) => {
    return null

})
*/


async function getLegitFamousPeople() {
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

    for(let i = 0; i < process.env.NUMBER_OF_API_REQUESTS; i++) {
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
            throw(err)
        }

        

        // increment to the next result of popular tweets
        seed_tweets.params['max_id'] = resp.data.search_metadata.next_results.match(/max_id=(\d+)/)[1]
        
    }
    //remove any duplicates
    return Object.values(legitFamousPeople)
    
}

const getTopFiveFamousNFLTweeters = () => {
    getLegitFamousPeople(4).then((famousPeople) => {
        console.log(famousPeople)
        famousPeople.forEach((person) => {
        })
        
        famousPeople.sort((a,b) => b.user.followers_count - a.user.followers_count )
        let rank = 1
        famousPeople.forEach((person) => {
            console.log(`twitter handle: ${rank}: ${person.user.screen_name} | name: ${person.user.name} | followers: ${person.user.followers_count}`)
            rank++
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

getTopFiveFamousNFLTweeters()