<template>
  <router-view/>
</template>

<script setup>
import {useStore} from "@/stores/store";
const store = useStore()

store.loadNavList()

</script>