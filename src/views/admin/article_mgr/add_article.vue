<template>
  <MdEditor v-model="data.content" :theme="theme"/>
</template>

<script setup>
import {reactive, ref} from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const theme = ref("")

const data = reactive({
  content:"hello xixi\n```\npython is the\n```"
})

const text = ref('Hello Editor!');
</script>


<style scoped>
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
</style>