<template>
    <a v-if="instagramAuthLink" :href="instagramAuthLink">
    <button>Se connecter à instagram</button>
    </a>
</template>
<script setup>    
    const oauthToken = ref(null)
    const instagramAuthLink = ref(null)

    const requestToken = async ()=>{
        const token = await $fetch("/api/instagram/requestToken")
        if(!token){
            return;
        }
        oauthToken.value = token
        instagramAuthLink.value = `https://api.instagram.com/oauth/authenticate?oauth_token=${token}`
    }

    requestToken()
</script>