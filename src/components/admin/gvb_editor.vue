<template>
  <MdEditor ref="editorRef" v-model="content" :theme="theme" @onUploadImg="onUploadImg" @on-save="onSave"/>

</template>

<script setup>
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {onMounted, ref, watch} from "vue";
import {useStore} from "@/stores/store";
import {uploadImageApi} from "@/api/image_api";

const store = useStore()
const theme = ref("dark")
const props = defineProps({
  content: {
    type: String,
  }
})
const content = ref("")

const emit = defineEmits(['update:content',"onSave"])

// 监听，更新给父组件
watch(content, () => {
  emit('update:content', content.value)
})

watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调


const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return uploadImageApi(file)
      })
  );

  callback(res.map((item) => item.data));
};


// ctrl s,  md是md原文,h是转换函数
const onSave = (md, h) => {
  emit("onSave",md)
};

onMounted(() => {
  editorRef.value?.focus()
})
</script>

<style lang="scss">
</style>