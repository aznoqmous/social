import { useSocialsStore } from "~/store/socials"
import { useDb } from "~/composables/useDb"
import { storeToRefs } from "pinia"
export default defineNuxtPlugin(app => {
    app.hook("app:created", async ()=>{
        const prisma =  useDb()
        const socials = await prisma.social.findMany({
            where: {
                NOT: { name: null }
            }
        })
        const socialsStore = useSocialsStore()
        const store = storeToRefs(socialsStore).values
        store.value = socials  
    })
})