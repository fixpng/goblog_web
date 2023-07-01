<template>
  <LoginSignData v-if="show && data.date_list.length" :data="data"/>
</template>

<script setup>
import LoginSignData from "./login_sign_data.vue"
import {reactive, ref, watch} from "vue";
import {useStore} from "@/stores/store";
import {getWeekDataApi} from "@/api/data_api";

const store = useStore()
const show = ref(true)
const data = reactive({
  date_list: [],
  login_data: [],
  sign_data: [],
})
watch(() => store.theme, () => {
  show.value = false
  setTimeout(() => {
    show.value = true
  })
})

async function getData() {
  let res = await getWeekDataApi()
  data.date_list = res.data.date_list
  data.login_data = res.data.login_data
  data.sign_data = res.data.sign_data
}

getData()

</script>
