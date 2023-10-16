import prisma from "prisma"
export default defineEventHandler(async(event) => {
    const site = await prisma.social.findFirst({
        where: {
            id: parseInt(event.context.params.id)
        }
    })
    return await prisma.social.delete({
        where: {
            id: site.id
        }
    })
})