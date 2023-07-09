<template>
  <GVBCard title="今日热搜" class="news_card" link_name="查看更多" link="/news">
    <span class="index">1</span>
    <a href="https://www.baidu.com" target="_blank">百度一下你就知道</a>
    <span class="num">60万</span>
  </GVBCard>
</template>

<script setup>
import GVBCard from "@/components/gvb_card.vue";
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
      width: 80%;
    }

    .num {
      width: 20%;
      text-align: right;
    }
  }
}
</style>