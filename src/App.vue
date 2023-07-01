<template>
  <router-view/>
</template>

<script setup>
import {useStore} from "@/stores/store";
import { provide } from "vue";
import * as echarts from "echarts";
provide("echarts", echarts);

// 初始化用户
const store  = useStore()
store.loadUserInfo()

</script>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root{
 --active: #4480db;
  --text: #555;
}

</style>