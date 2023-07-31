<template>
    <Fireworks/>
  <router-view/>
</template>

<script setup>
import {useStore} from "@/stores/store";
import Fireworks from "@/assets/js/fireworks";
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
 --active: #4497db;
 //--active: #6dc7c0;
  --text: #7a7a7a;
}

</style>