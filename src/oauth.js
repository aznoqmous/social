import OAuth from "oauth-1.0a"
import crypto from "crypto"
export const oauth = async(
    url, 
    opts={}
    )=>{
        opts = Object.assign({
            method: "POST",
            consumerKey: "OuXUbyetPMHCKlQXacKW4sU4U",
            consumerSecret: "s6PyZTS8D0aYNBbigCdDGXazKDsEYmfqvOPPOcW88gvMeIMNYo",
            appToken: "1711342856567144448-ZcWRinhtBkx49BpYr6XHWPGOzwsNmU",
            callback: null,
            auths: {}, 
            body: {},
            contentType: "x-www-form-urlencoded"
        }, opts)
    
    const oauth = OAuth({
        consumer: {
            key: opts.consumerKey,
            secret: opts.consumerSecret
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64')
        },
    })

    const request_data = {
        url,
        method: opts.method,
    }
    if(opts.callback) request_data.oauth_callback = opts.callback
    
    let body = null
    if(opts.method == "POST"){

        if(opts.contentType == "x-www-form-urlencoded"){
            body = new FormData()
            request_data.data = opts.body
        }
        if(opts.contentType == "application/json"){
            body = JSON.stringify(opts.body)
        }
    }

    const auths = oauth.authorize(request_data, opts.appToken)
    for(let key in opts.auths) auths[key] = opts.auths[key]
    const headers = oauth.toHeader(auths)
    headers['Content-Type'] = opts.contentType
    return await fetch(request_data.url, {
        method: request_data.method,
        headers,
        body
    })
}