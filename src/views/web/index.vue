<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <GVBBanner></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container gvb_index_main">
        <div class="left">
<GVBNews></GVBNews>
          <GVBArticleCalendar style="margin-top: 20px"></GVBArticleCalendar>
        </div>
        <div class="right">
          22
        </div>
      </div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue";
import GVBBanner from "@/components/gvb_banner.vue";
import GVBNews from "@/components/index/gvb_news.vue";
import GVBArticleCalendar from "@/components/index/gvb_article_calendar.vue";

</script>


<style lang="scss">


.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;

    .gvb_inner_container {
      //background-color: var(--card_bg);
      min-height: 1000px;
      width: 1200px;
      margin-top: 20px;
    }
  }
}

.index_view {
  .gvb_inner_container {
    display: flex;
    justify-content: space-between;
  }

  .gvb_index_main {
    .left {
      width: calc(100% - 416px);
    }

    .right {
      width: 396px;
    }
  }


}


</style>