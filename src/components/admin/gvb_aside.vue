<template>
  <aside class="gvb_aside">
    <div class="gvb_aside_header flex">
      <div class="gvb_aside_logo flex">
        <img src="src/assets/images/checken_logo.png">
      </div>
      <div class="gvb_aside_title flex">FixPng后台系统</div>
    </div>
    <div class="gvb_aside_body">

    </div>
  </aside>
</template>

<script setup>
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
    margin-bottom: 20px;
  }
}

.gvb_aside_title {
  font-size: 20px;
  color: #d1cfdb;
}
</style>