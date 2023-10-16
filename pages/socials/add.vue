<template>
    <TwitterAuth></TwitterAuth>
    <InstagramAuth></InstagramAuth>
</template>
<script setup>
    import SocialTypes from "../../src/SocialTypes.json"

    const types = ref([])
    types.value = Object.keys(SocialTypes)
</script>