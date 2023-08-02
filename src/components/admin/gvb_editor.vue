<template>
  <MdEditor class="gvb_md_edit" ref="editorRef" v-model="content" :theme="theme" @onUploadImg="onUploadImg" @on-save="onSave"/>

</template>

<script setup>
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {onMounted, ref, watch} from "vue";
import {useStore} from "@/stores/store";
import {uploadImageApi} from "@/api/image_api";
import {message} from "ant-design-vue";

const store = useStore()
const theme = ref("dark")
const props = defineProps({
  content: {
    type: String,
  }
})
const content = ref("")
const editorRef = ref(null)

function getData() {
  content.value = props.content
}

getData()
const emit = defineEmits(['update:content', "onSave"])

// 监听，更新给父组件
watch(content, () => {
  emit('update:content', content.value)
})

watch(() => props.content, () => {
  content.value = props.content
}, {immediate: true})

watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调

// 粘贴上传图片方法
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return uploadImageApi(file)
      })
  );
  let resOne = res[0]
  if (resOne.code) {
    message.error(resOne.msg)
    return
  }
  callback(res.map((item) => {
    return item.data
  }));
};


// ctrl s,  md是md原文,h是转换函数
const onSave = (md, h) => {
  emit("onSave", md)
};

onMounted(() => {
  editorRef.value?.focus()
})
</script>

<style lang="scss">
/*
.dark code[class*=language-], .dark pre[class*=language-] {
  color: #c2c2c2;
}
*/
.md-editor-dark {
  --md-color: #999;
  --md-hover-color: #bbb;
  --md-bk-color: #151515FF;
  --md-bk-color-outstand: #111;
  --md-bk-hover-color: #1b1a1a;
  --md-border-color: #2d2d2d;
  --md-border-hover-color: #636262;
  --md-border-active-color: #777;
  --md-modal-mask: #00000073;
  --md-scrollbar-bg-color: #212121;
  --md-scrollbar-thumb-color: #2d2d2d;
  --md-scrollbar-thumb-hover-color: #3a3a3a;
  --md-scrollbar-thumb-active-color: #3a3a3a;
}

.gvb_md_edit {
  height: calc(100vh - 130px);
}
</style>