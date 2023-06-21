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
      icon: "fa-home",
      title: "首页",
      name: "home",
      children: []
    },
    {
      id: 23,
      icon: "fa-home",
      title: "个人中心",
      name: "user_center",
      children: [
        {
          id: 24,
          icon: "fa-home",
          title: "我的信息",
          name: "user_info",
        },
        {
          id: 25,
          icon: "fa-home",
          title: "我的发布",
          name: "user_article_list",
        },
        {
          id: 26,
          icon: "fa-home",
          title: "我的收藏",
          name: "user_collects",
        },
        {
          id: 27,
          icon: "fa-home",
          title: "我的消息",
          name: "user_messages",
        }
      ]
    },
    {
      id: 3,
      icon: "fa-users",
      title: "用户列表",
      name: "user_list",
      children: []
    }
    ,
    {
      id: 5,
      icon: "fa-users",
      title: "图片列表",
      name: "image_list",
      children: []
    }
    ,

    {
      id: 7,
      icon: "fa-users",
      title: "广告列表",
      name: "advert_list",
      children: []
    }
    ,

    {
      id: 9,
      icon: "fa-users",
      title: "菜单列表",
      name: "menu_list",
      children: []
    }
    ,
    {
      id: 11,
      icon: "fa-users",
      title: "日志列表",
      name: "log_list",
      children: []
    }
    ,
    {
      id: 12,
      icon: "fa-users",
      title: "群聊消息",
      name: "chat_list",
      children: []
    }
    ,
    {
      id: 13,
      icon: "fa-users",
      title: "消息列表",
      name: "message_list",
      children: []
    }
    ,
    {
      id: 14,
      icon: "fa-users",
      title: "文章列表",
      name: "article_list",
      children: []
    }
    ,
    {
      id: 22,
      icon: "fa-users",
      title: "添加文章",
      name: "add_article",
      children: []
    }
    ,
    {
      id: 15,
      icon: "fa-users",
      title: "标签列表",
      name: "tag_list",
      children: []
    }
    ,
    {
      id: 16,
      icon: "fa-users",
      title: "系统管理",
      name: "",
      children: [
        {
          id: 17,
          icon: "fa-users",
          title: "项目配置",
          name: "system",
        },
      ]
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