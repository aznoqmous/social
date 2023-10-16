<template>
    <a v-if="twitterAuthLink" :href="twitterAuthLink">
    <button>Se connecter à Twitter</button>
    </a>
</template>
<script setup>    
    const oauthToken = ref(null)
    const twitterAuthLink = ref(null)

    const requestToken = async ()=>{
        const token = await $fetch("/api/twitter/requestToken")
        if(!token){
            return;
        }
        oauthToken.value = token
        twitterAuthLink.value = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`
    }

    requestToken()
</script>