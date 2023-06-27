<template>
  <a-breadcrumb>
    <a-breadcrumb-item >
      <a href="javascript:void (0)" @click="goto('admin_index')">首页</a>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item,index) in store.bread_crumb_list" :key="index">
        {{item}}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import {useRouter,useRoute} from "vue-router";
import {useStore} from "@/stores/store";

const router = useRouter()
const route= useRoute()
const store = useStore()

function loadData(){
  let name =route.name
  if (name === 'home'){
    return
  }
    for (const tab of store.tabList) {
   if (name === tab.name){
     store.setCrumb([tab.parentTitle,tab.title])
   }
  }
}

loadData()
function goto(name) {
  router.push({
    name: name
  })
}
</script>

<style scoped>

</style>