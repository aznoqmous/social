<template>
    <div class="socials">
        <div class="social" v-for="social in socials">
            <i :class="SocialTypes[social.type].icon"></i>
            <a :href="'/socials/' + social.id">{{ social.name }}</a>
            <span>{{ social.id }}</span>
            <i class="fa-solid fa-xmark" :id="social.id" @click="handleDelete(social)"></i>
        </div>
    </div>
    <a href="/socials/add">
        <button>Add</button>
    </a>
</template>

<script setup>
import SocialTypes from "~/src/SocialTypes.json"
import { useSocialsStore } from "~/store/socials"
import { storeToRefs } from "pinia"
const socialsStore = useSocialsStore()
const socials = storeToRefs(socialsStore).values
const handleDelete = (social)=>{
    if(confirm(`Confirm to delete ${social.type} account`)) socialsStore.delete(social)
}
</script>

<style>
.socials {
    display: flex;
    flex-direction: column;
}
.social {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-weight: bold;
}
</style>