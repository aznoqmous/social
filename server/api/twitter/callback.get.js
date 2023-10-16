import prisma from "prisma"
import { oauth } from "oauth"

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)
    const social = await prisma.social.findFirst({
        where: {
            apiToken: query.oauth_token
        }
    })

    const res = await oauth(
        "https://api.twitter.com/oauth/access_token",
        {
            callback: "http://localhost:3000/api/twitter/callback",
            auths: {
                oauth_token: query.oauth_token
            },
            body: {
                oauth_verifier: query.oauth_verifier
            }
        }
    ).then(res => res.text())

    const params = new URLSearchParams(res)
    console.log(params)
    await prisma.social.update({
        where: {
            id: social.id
        },
        data: {
            apiToken: params.get('oauth_token'),
            apiSecret: params.get('oauth_token_secret'),
            name: params.get('screen_name'),
            apiId: params.get('user_id')
        }
    });
    await sendRedirect(event, "/", 302)
})