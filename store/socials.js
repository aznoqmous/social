import {defineStore} from "pinia"

export const useSocialsStore = defineStore("socialStore", ()=>{
    const values = ref([])
    return {
        add: (social) => values.value.push(social),
        delete: (social) => {
            $fetch(`/api/socials/${social.id}/delete`)
            values.value = values.value.filter(s => social.id != s.id)
        },
        byId: (id)=>{
            const matches = values.value.filter(s => s.id == id)
            return matches.length ? matches[0] : null
        },
        values
    }
})