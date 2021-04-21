import axios from 'axios'


const super_secret_token_v1 = process.env.SECRET_TOKEN1
const super_secret_token_v2 = process.env.SECRET_TOKEN2

export default function apiRequest(path,params) {
    
    const v1Regex = new RegExp('^\/1\.1\/')
    const v2Regex = new RegExp('^\/2\/')
    let token

    if(path.match(v1Regex)) {
        token = super_secret_token_v1
    }

    else if (path.match(v2Regex)) {
        token = super_secret_token_v2
    }

    

    else {
        throw(`bad path when creating request: ${path}.  Check path an try again.`)
    }

    console.log('Making API request')

    

    

    let req = axios.create({
        baseURL: 'https://api.twitter.com/',
        timeout: 10000,
        headers: {
        'Authorization': 'Bearer ' + token
        },
        params: params
    })

    return req.get(path)


}

