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
          <GVBTagCard></GVBTagCard>
          <GVBSiteCard style="margin-top: 20px"></GVBSiteCard>
          <GVBFadeBackCard style="margin-top: 20px"></GVBFadeBackCard>
          <GVBMyCard style="margin-top: 20px"></GVBMyCard>
        </div>
      </div>
    </div>
    <GVBFooter></GVBFooter>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue";
import GVBBanner from "@/components/gvb_banner.vue";
import GVBNews from "@/components/index/gvb_news.vue";
import GVBArticleCalendar from "@/components/index/gvb_article_calendar.vue";
import GVBTagCard from "@/components/index/gvb_tag_card.vue";
import GVBSiteCard from "@/components/index/gvb_site_card.vue";
import GVBFadeBackCard from "@/components/index/gvb_fade_back_card.vue";
import GVBMyCard from "@/components/index/gvb_my_card.vue";
import GVBFooter from "@/components/gvb_footer.vue";

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