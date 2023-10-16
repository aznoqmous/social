export const useOAuth = async(url, oauth_callback)=>{
    const consumerKey = "OuXUbyetPMHCKlQXacKW4sU4U"
    const consumerSecret = "s6PyZTS8D0aYNBbigCdDGXazKDsEYmfqvOPPOcW88gvMeIMNYo"
    const appToken = "1711342856567144448-ZcWRinhtBkx49BpYr6XHWPGOzwsNmU"
    
    const oauth = OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret
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
        method: "POST",
        oauth_callback
    }

    return await fetch(request_data.url, {
        method: request_data.method,
        headers: oauth.toHeader(oauth.authorize(request_data, appToken)),
    })
}