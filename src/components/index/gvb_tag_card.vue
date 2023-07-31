<template>

  <GVBCCard title="标签" top20 class="tags_cloud_card">
    <ul class="tags_cloud_ul">
      <li
          :class="{active: item.tag === store.tag}"
          @click="checkTag(item.tag)"
          v-for="(item, index) in data.tag_list"
          :key="index">
        <span>{{ item.tag }}</span>
        <i>{{ item.count }}</i>
      </li>
    </ul>
  </GVBCCard>

</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";
import {getTagArticleListApi} from "@/api/tag_api";
import {useStore} from "@/stores/store";

const store = useStore()
const data = reactive({
  tag_list: [
    {"tag": "后台", "count": 8},
  ]
})


async function getData() {
  let res = await getTagArticleListApi()
  data.tag_list = res.data.list
}


function checkTag(tagName){
  store.setTag(tagName)
}

getData()
</script>

<style lang="scss">


@keyframes move_box {
  0% {
    left: 0;
    top: 0;
    background-color: #8ca3ff;
  }

  25% {
    left: calc(100% - 20px);
    top: 0;
    background-color: #ff8c8c;
  }

  50% {
    top: calc(100% - 20px);
    left: calc(100% - 20px);
    background-color: #fff58c;
  }

  75% {
    left: 0;
    top: calc(100% - 20px);
    background-color: #8cffea;
  }

  to {
    left: 0;
    top: 0;
    background-color: #8ca3ff;
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
    cursor: pointer;

    &:hover{
      color: var(--active);
    }
    &.active{
        color: var(--active);
    }


    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      font-size: 10px;
      color: var(--card_bg);
      background-color: var(--active);
      border-radius: 50%;
      margin-left: 5px;
    }
  }

  li:nth-child(6n+1), li:nth-child(6n+2), li:nth-child(6n+3) {
    background-color: var(--bg)
  }

  li:nth-child(3n+1), li:nth-child(3n+2) {
    border-right: 1px solid var(--bg_darken)
  }
}
</style>