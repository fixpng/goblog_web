<template>
  <aside class="gvb_aside">
    <div class="gvb_aside_header flex">
      <div class="gvb_aside_logo flex">
        <img src="/src/assets/images/checken_logo.png">
      </div>
      <div class="gvb_aside_title flex">FIXPNG个人网站后台</div>
    </div>
    <div class="gvb_aside_body;margin-bottom: 20px">
      <GVBAsideMenu></GVBAsideMenu>
    </div>
  </aside>
</template>

<script setup>
import GVBAsideMenu from "./gvb_aside_menu.vue"
</script>

<style lang="scss">
.gvb_aside {
  width: 240px;
  height: 100vh;
  background-color: var(--slide);
}

.gvb_aside_header {
  width: 100%;
  flex-direction: column;
}

.gvb_aside_logo {
  img {
    width: 50%;
    height: 50%;
    margin-bottom: 10px;
  }
}

.gvb_aside_title {
  font-size: 20px;
  color: #d3d3d3;
  margin-bottom: 20px;
}

</style>