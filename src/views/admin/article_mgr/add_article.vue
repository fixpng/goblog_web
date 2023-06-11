<template>
  <MdEditor v-model="data.content" :theme="theme"/>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import {useStore} from "@/stores/store";
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const store = useStore()
const theme = ref("dark")

const data = reactive({
  content: "hello xixi\n```\npython is the\n```"
})

watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调

const text = ref('Hello Editor!');
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

.md-editor{
  height: calc(100vh - 130px);
}
</style>