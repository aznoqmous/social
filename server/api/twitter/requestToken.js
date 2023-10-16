
import prisma from "prisma"
import { oauth } from "oauth"
import SocialTypes from "../../../src/SocialTypes.json"
export default defineEventHandler(async(event) => {
    const res = await oauth(
        "https://api.twitter.com/oauth/request_token", 
        {
            callback: "http://localhost:3000/api/twitter/callback"
        }
    )
    const params = new URLSearchParams(await res.text())
    if(!params.get('oauth_token')) return null

    await prisma.social.create({
        data: {
            type: SocialTypes.twitter.key,
            apiToken: params.get('oauth_token')
        }
    })
    return params.get('oauth_token')
})

// -- Consumer
// OuXUbyetPMHCKlQXacKW4sU4U
// s6PyZTS8D0aYNBbigCdDGXazKDsEYmfqvOPPOcW88gvMeIMNYo

// -- Access
// 1711342856567144448-ZcWRinhtBkx49BpYr6XHWPGOzwsNmU
// XsHbQ2o2xSwJYhIsQT68FXAQD693yOXYweqyNwMkeQNFb

