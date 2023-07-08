<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
      <GVBBanner url="src/assets/images/login_bg_black.jpg"
                 slogan="幻想乡"
                 abstract="天寒地冻路远马亡又何妨" >
      </GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container"></div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue";
import GVBBanner from "@/components/gvb_banner.vue";

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


}
</style>