<template>
  <div>
文章编辑
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const content = ref("");

console.log(route)
</script>

<style scoped>

</style>