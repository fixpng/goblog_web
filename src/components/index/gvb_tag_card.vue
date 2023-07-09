<template>

  <GVBCCard title="标签云" top20 class="tags_cloud_card">
    <ul class="tags_cloud_ul">
      <li v-for="(item, index) in data.tag_list" :key="index">
        <span>{{ item.tag }}</span>
        <i>{{ item.count }}</i>
      </li>
    </ul>
  </GVBCCard>

</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";

const data = reactive({
  tag_list: [
    {"tag": "后台", "count": 8},
    {"tag": "前端", "count": 2},
    {"tag": "后台", "count": 15},
    {"tag": "后台", "count": 28},
    {"tag": "python", "count": 63},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
    {"tag": "后台", "count": 8},
  ]
})


</script>

<style lang="scss">


@keyframes move_box {
  0% {
    left: 0;
    top: 0;
    background-color: #2adb94;
  }

  25% {
    left: calc(100% - 20px);
    top: 0;
    background-color: #bbdb2a;
  }

  50% {
    top: calc(100% - 20px);
    left: calc(100% - 20px);
    background-color: #2a91db;
  }

  75% {
    left: 0;
    top: calc(100% - 20px);
    background-color: #e748a3;
  }

  to {
    left: 0;
    top: 0;
    background-color: #e87565;
  }
}

.tags_cloud_card .body {
  position: relative;

  &::before {
    display: block;
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    background-color: var(--active);
    -webkit-animation-name: move_box;
    animation-name: move_box;
    -webkit-animation-duration: 5s;
    animation-duration: 5s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
}


.tags_cloud_ul {
  display: flex;
  flex-wrap: wrap;

  li {
    width: 33.33%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--h2);
  }

  li:nth-child(6n+1), li:nth-child(6n+2), li:nth-child(6n+3) {
    background-color: var(--bg)
  }

  li:nth-child(3n+1), li:nth-child(3n+2) {
    border-right: 1px solid var(--bg_darken)
  }
}
</style>