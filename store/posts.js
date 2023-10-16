import {defineStore} from "pinia"

export const usePostsStore = defineStore("postStore", ()=>{
    const values = ref([])
    return {
        add: (post) => values.value.push(post),
        byId: (id)=>{
            const matches = values.value.filter(s => s.id == id)
            return matches.length ? matches[0] : null
        },
        byPid: (pid)=>{
            return values.value.filter(s => s.pid == pid)
        },
        values
    }
})