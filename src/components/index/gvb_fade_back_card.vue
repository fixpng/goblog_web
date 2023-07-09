<template>
  <GVBCCard title="意见反馈" class="fade_back_card">
    <a-input placeholder="请输入邮箱" v-model:value="data.email"></a-input>
    <a-textarea placeholder="请输入反馈内容" v-model:value="data.content" :auto-size="{ minRows: 3, maxRows: 5 }"
                style="margin-top: 10px"></a-textarea>
    <a-button type="primary" style="width: 100%; margin-top: 10px" @click="okHandler">提交</a-button>
  </GVBCCard>

</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";
import {message} from "ant-design-vue";

const data = reactive({
  email: "",
  content: ""
})

function okHandler() {
  data.content = ""
  message.success("反馈成功")
}
</script>

<style scoped>

</style>