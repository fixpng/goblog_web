<template>
  <div class="base_view index_view">
    <GVBNav is_show></GVBNav>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">
        聊天室

      </div>
    </div>
    <GVBFooter style="margin-top: 20px"></GVBFooter>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {reactive} from "vue";

const data = reactive({})

</script>

<style lang="scss">

.base_view {
  background-color: var(--bg);

  .gvb_base {
    display: flex;
    justify-content: center;

    .gvb_inner_container {
      width: 1200px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}


</style>