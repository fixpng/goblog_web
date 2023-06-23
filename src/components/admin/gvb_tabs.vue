<template>
  <div class="gvb_tabs">
    <div :class="isActive(item)"
         v-for="(item,index) in store.tabList"
         :key="index"
         @click="checkTab(item)"
    >
      {{ item.title }}
      <span @click.stop="removeTab(item)" v-if="item.name !=='home'" class="gvb_tab_remove_icon">×</span>
    </div>

    <div class="gvb_tab_item remove_all" @click="removeTabAll">
      全部关闭
    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/stores/store";
import {useRoute, useRouter} from "vue-router";

const store = useStore()
const route = useRoute()
const router = useRouter()

// 是否选中
function isActive(item) {
  // 判断当前路由是否和item上的路由匹配
  // 还要判断是不是home
  if (route.name === item.name) {
    return "gvb_tab_item active"
  }
  return "gvb_tab_item"
}

// 切换路由
function checkTab(item) {
  if (item.parentTitle === undefined) {
    store.setCrumb([])
  } else {
    store.setCrumb([item.parentTitle, item.title])
  }

  router.push({
    name: item.name,
    params: item.params,
    query: item.query,
  })
}

// 移除tab
function removeTab(item) {
  let index = store.removeTab(item)
  // 如果删除的是当前所在的tab，应该向前走一步
  if (item.name === route.name) {
    // 当前tab
    // 前一个路由的路由索引
    let beforeIndex = index - 1
    // 找到前一个路由
    let beforeName = store.tabList[beforeIndex].name
    router.push({
      name: beforeName
    })
  }
}

// 关闭全部
function removeTabAll() {
  store.removeTabAll()
  router.push({
    name: "home"
  })
}


// 监听刷新
window.onbeforeunload = function () {
  // 保存
  store.saveTabs()
  return undefined
}

</script>

<style lang="scss">
.gvb_tabs {
  height: 30px;
  border-color: var(--order);
  border-style: solid;
  border-width: 1px 0 1px 0;
  background-color: var(--card_bg);
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
  overflow-x: auto;

  .gvb_tab_item {
    background-color: var(--card_bg);
    border: 1px solid var(--card_boder);
    padding: 0 10px;
    margin-right: 10px;
    cursor: pointer;
    color: var(--text);
    display: flex;
    align-items: center;

    .gvb_tab_remove_icon {
      cursor: pointer;
      width: 12px;
      height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      border-radius: 50%;

      &:hover {
        background-color: #f0eeee;
      }
    }

    &:first-child {
      margin-left: 20px;
    }

    &.active {
      background-color: var(--active);
      border-color: var(--active);
      color: white;

      &::before {
        display: inline-block;
        content: "";
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
        margin-right: 5px;
      }

      .gvb_tab_remove_icon:hover {
        background-color: #7e98db;
      }
    }

    &.remove_all {
      position: absolute;
      right: 20px;
    }
  }
}
</style>