import { oauth } from "oauth"

export default defineEventHandler(async event => {
    const body = readBody(event)
    const account = await prisma.social.findFirst({
        where: {
            type: "twitter",
            id: parseInt(event.context.params.id)
        }
    })
    const res = await oauth(
        `https://api.twitter.com/2/tweets`,
        {
            appToken: {
                key: account.apiToken,
                secret: account.apiSecret
            },
            contentType: "application/json",
            body: {
                text: body.text || "I love twitter, really azdazdyeaheaheah"
            }
        }
    ).then(res => res.json())
    console.log(res)
    if(res.status == 403) return res
    const post = await prisma.post.create({
        data: {
            pid: parseInt(event.context.params.id),
            content: res.data.text,
            twitterPostId: res.data.id
        }
    }) 
    return post
})

