import { usePostsStore } from "~/store/posts"
import { useDb } from "~/composables/useDb"
import { storeToRefs } from "pinia"
export default defineNuxtPlugin(app => {
    app.hook("app:created", async ()=>{
        const prisma =  useDb()
        const posts = await prisma.post.findMany({})
        const postsStore = usePostsStore()
        const store = storeToRefs(postsStore).values
        store.value = posts  
    })
})