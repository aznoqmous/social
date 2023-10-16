<template>
    <h1>@{{ social.name }}</h1>
    <h2>{{ social.type }}</h2>
    <div class="post" v-for="post in posts">
        <span>{{ post.createdAt }}</span>
        <div class="content">
            {{ post.content }}
        </div>
    </div>
</template>
<script setup>
import { useSocialsStore } from "~/store/socials"
import { usePostsStore } from "~/store/posts"
const route = useRoute()
const social = ref(null)
social.value = useSocialsStore().byId(route.params.id)
const posts = ref([])
posts.value = usePostsStore().byPid(route.params.id)
console.log(posts.value)
</script>