<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <div class="gvb_banner">
      <img src="src/assets/images/login_bg_black.jpg"/>
    </div>
    <div class="gvb_base_container">
      <div class="gvb_inner_container"></div>

    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue";

</script>

<style lang="scss">


.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;

    .gvb_inner_container {
      background-color: var(--card_bg);
      min-height: 1000px;
      width: 1200px;
      margin-top: 20px;
    }
  }


  .gvb_banner {
    height: 600px;
    width: 100%;
    background-color: var(--card_bg);
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      //display:;
    }
  }
}
</style>