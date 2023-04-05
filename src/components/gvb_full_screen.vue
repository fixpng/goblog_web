<template>
  <i v-if="isFull" @click="fullScreen" class="iconfont icon-ln_quanpingtuichu"></i>
  <i v-else @click="fullScreen" class="iconfont icon-ln_quanping"></i>
</template>

<script setup>

import {ref} from "vue";
const isFull = ref(false)

function isFullScreen() {
  return document.fullscreenElement !== null
}


function exitFullScreen() {
  let exitMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreen;
  if (exitMethod) {
    exitMethod.call(document);
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}

// 全屏或取消全屏
function fullScreen() {
  let element = document.documentElement
  // 判断是否处于全屏
  isFull.value = !isFull.value
  if (isFullScreen()) {
    // 退出全屏
    exitFullScreen()
    return
  }
  // 全屏
  let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}
</script>
