import axios from 'axios'
import {SECRET_TOKEN} from '@env'


// This creates a twitter API request.  You need to put the SECRET_TOKEN in a .env file so that request can be properly signed with my bearer token
export default function apiRequest(path,params) {
    
    const v1Regex = new RegExp('^\/1\.1\/')
    const v2Regex = new RegExp('^\/2\/')
    let token = SECRET_TOKEN

    if(path.match(v1Regex)) {
        console.log("using Twitter API v1")

    }

    else if (path.match(v2Regex)) {
        console.log("using Twitter API v2")
    }

    else {
        throw(`Bad path when creating request: ${path}.  Check path an try again.`)
    }
    console.log("------------------------------")
    console.log('Making API request...')

    let requestArgs = {
        baseURL: 'https://api.twitter.com/',
        timeout: 10000,
        headers: {
        'Authorization': 'Bearer ' + token
        },
        params: params
    }

    console.log("request details")
    console.log(requestArgs)
    console.log("------------------------------")

    

    let req = axios.create(requestArgs)

    return req.get(path)


}

