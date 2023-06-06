<template>
  <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      multiple
      :inline-collapsed="false"
      @click="goto"
      @openChange="onOpenChange"
      :open-keys="data.openKeys"
  >
    <template v-for="menu in data.menuList" :key="menu.name">
      <a-menu-item :key="menu" v-if="menu.children.length === 0">
        <template #icon>
          <i :class="'fa '+menu.icon"></i>
        </template>
        <span>{{ menu.title }}</span>
      </a-menu-item>
      <a-sub-menu :key="menu.id" v-else>
        <template #icon>
          <i :class="'fa '+menu.icon"></i>
        </template>
        <template #title>{{ menu.title }}</template>
        <a-menu-item v-for="sub_menu in menu.children" :key="sub_menu">
          <template #icon>
            <i :class="'fa '+sub_menu.icon"></i>
          </template>
          <span>{{ sub_menu.title }}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>


  </a-menu>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter, useRoute, onBeforeRouteUpdate} from "vue-router";
import {useStore} from "@/stores/store";

const store = useStore()
const data = reactive({
  menuList: [
    {
      id: 1,
      icon: "fa-home", // icon的图片，统一用 fa
      title: "首页", // 菜单名称
      name: "home", // 路由名称
      children: []
    },
    {
      id: 3,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "用户列表", // 菜单名称
      name: "user_list", // 路由名称
      children: []
    }
    ,
    {
      id: 5,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "图片列表", // 菜单名称
      name: "image_list", // 路由名称
      children: []
    }
    ,

    {
      id: 7,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "广告列表", // 菜单名称
      name: "advert_list", // 路由名称
      children: []
    }
    ,

    {
      id: 9,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "菜单列表", // 菜单名称
      name: "menu_list", // 路由名称
      children: []
    }
    ,
    {
      id: 11,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "日志列表", // 菜单名称
      name: "log_list", // 路由名称
      children: []
    }
    ,
    {
      id: 12,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "群聊消息", // 菜单名称
      name: "chat_list", // 路由名称
      children: []
    }
    ,
    {
      id: 13,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "消息列表", // 菜单名称
      name: "message_list", // 路由名称
      children: []
    }
    ,
    {
      id: 14,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "标签列表", // 菜单名称
      name: "tag_list", // 路由名称
      children: []
    }
    ,
    {
      id: 15,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "系统管理", // 菜单名称
      name: "", // 路由名称
      children: [{
        id: 16,
      icon: "fa-users", // icon的图片，统一用 fa
      title: "网站设置", // 菜单名称
      name: "system_site", // 路由名称
      }]
    }
  ],
  openKeys: []
})
const selectedKeys = ref([])
const router = useRouter()
const route = useRoute()

function goto({item, key, keyPath}) {
  store.addTab({
    name: key.name,
    title: key.title
  })
  // 加入到 tabs
  router.push({
    name: key.name
  })
}

// 菜单栏只展开一个
function onOpenChange(openKeys) {
  const latestOpenKey = openKeys.find(key => data.openKeys.indexOf(key) === -1);
  data.openKeys = latestOpenKey ? [latestOpenKey] : [];
}

function loadRoute(name) {
  if (name === undefined) {
    name = route.name
  }
  for (const menu of data.menuList) {
    if (menu.name === name) {
      selectedKeys.value = [menu]
      return
    }
    for (const subMenu of menu.children) {
      if (subMenu.name === name) {
        selectedKeys.value = [subMenu]
        // 找到id，展开对应的菜单
        data.openKeys = [menu.id]
        return
      }
    }
  }
}

onBeforeRouteUpdate((to, from, next) => {
  loadRoute(to.name)
  next()

})
loadRoute()

</script>

<style>
.ant-menu {
  background-color: transparent;
  color: white;
}

.ant-menu-submenu-arrow {
  color: white;
}

.ant-menu-sub.ant-menu-inline {
  background-color: var(--slide_sub_bg);
}

.ant-menu-submenu-selected {
  color: inherit;
}

/*.ant-menu-inline .ant-menu-item{*/
/*  margin-top: 0;*/
/*  margin-bottom: 0;*/
/*}*/


</style>