<template>
  <ArticleCalendarInner :data_list="data.data_list" :theme="store.theme"  v-if="show && data.data_list.length"/>
</template>

<script setup>
import ArticleCalendarInner from "@/components/article_calendar_inner.vue";
import {reactive, ref, watch} from "vue";
import {useStore} from "@/stores/store";
import {getArticleCalendarApi} from "@/api/article_api";

const store = useStore()
const show = ref(true)
const data =reactive({
  data_list:[]
})


// 事件循环，实现文章热力图主题切换重新渲染
watch(() => store.theme, () => {
  show.value = false
  setTimeout(() => {
    show.value = true
  })
})

async function getData(){
  let res = await getArticleCalendarApi()
  data.data_list =res.data
}

getData()

</script>

<style >

</style>