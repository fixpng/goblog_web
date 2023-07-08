<template>
  <GVBCCard title="今日热搜" class="news_card" link_name="查看更多" link="/news">
    <span class="index">1</span>
    <a href="https://s.weibo.com/weibo?q=枫枫知道"
       target="_blank">枫枫知道</a>
    <span class="num">68.7万</span>
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"

</script>

<style lang="scss">
.news_card {
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .index {
      width: 5%;
    }

    a {
      width: 85%;
    }

    .num {
      width: 10%;
      text-align: right;
    }

  }


}
</style>