<template>
  <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inline-collapsed="false"
      :open-keys="data.openKeys"
  >
    <template v-for="menu in data.menuList" :key="menu.name">
      <a-menu-item :key="menu.name" v-if="menu.children.length === 0">
        <template #icon>
          <i :class="'fa '+menu.icon"></i>
        </template>
        <span>{{ menu.title }}</span>
      </a-menu-item>
      <a-sub-menu :key="menu.name" v-else>
        <template #icon>
          <i :class="'fa '+menu.icon"></i>
        </template>
        <template #title>{{ menu.title }}</template>
        <a-menu-item v-for="sub_menu in menu.children" @click="goto(sub_menu,menu)" :key="sub_menu.name">
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
      id: 2,
      icon: "fa-user-circle-o",
      title: "个人中心",
      name: "user_center",
      children: [
        {
          id: 21,
          icon: "fa-vcard",
          title: "我的信息",
          name: "user_info",
        },
        {
          id: 22,
          icon: "fa-user-plus",
          title: "我的发布",
          name: "user_article_list",
        },
        {
          id: 23,
          icon: "fa-heart",
          title: "我的收藏",
          name: "user_collects",
        },
        {
          id: 24,
          icon: "fa-desktop",
          title: "我的消息",
          name: "user_messages",
        }
      ]
    },
    {
      id: 3,
      icon: "fa-book",
      title: "文图管理",
      name: "wen_tu",
      children: [
        {
          id: 31,
          icon: "fa-graduation-cap",
          title: "添加文章",
          name: "add_article",
          children: []
        },
        {
          id: 32,
          icon: "fa-gift",
          title: "文章管理",
          name: "article_list",
          children: []
        },
        {
          id: 33,
          icon: "fa-file-image-o",
          title: "图片管理",
          name: "image_list",
          children: []
        },
        {
          id: 34,
          icon: "fa-comment",
          title: "评论管理",
          name: "comment_list",
          children: []
        }
      ]
    },
    {
      id: 4,
      icon: "fa-male",
      title: "用户管理",
      name: "users",
      children: [
        {
          id: 41,
          icon: "fa-users",
          title: "用户列表",
          name: "user_list",
          children: []
        },
        {
          id: 42,
          icon: "fa-group",
          title: "群聊消息",
          name: "chat_list",
          children: []
        },
        {
          id: 43,
          icon: "fa-user-circle",
          title: "消息列表",
          name: "message_list",
          children: []
        },
      ]
    },
    {
      id: 5,
      icon: "fa-cogs",
      title: "系统管理",
      name: "sys",
      children: [
        {
          id: 51,
          icon: "fa-tree",
          title: "菜单列表",
          name: "menu_list",
          children: []
        },
        {
          id: 52,
          icon: "fa-sun-o",
          title: "广告列表",
          name: "advert_list",
          children: []
        },

        {
          id: 53,
          icon: "fa-server",
          title: "系统日志",
          name: "log_list",
          children: []
        },
        {
          id: 54,
          icon: "fa-globe",
          title: "项目配置",
          name: "system",
        },
      ]
    },
  ],
  openKeys: []
})

// 判断用户权限为普通用户（暂不开启）
/*
if (store.userInfo.role === 2) {
  data.menuList = [
    {
      id: 1,
      icon: "fa-home",
      title: "首页",
      name: "home",
      children: []
    },
    {
      id: 2,
      icon: "fa-user-circle-o",
      title: "个人中心",
      name: "user_center",
      children: [
        {
          id: 21,
          icon: "fa-vcard",
          title: "我的信息",
          name: "user_info",
          children: []
        },
        {
          id: 23,
          icon: "fa-heart",
          title: "我的收藏",
          name: "user_collects",
          children: []
        },
        {
          id: 24,
          icon: "fa-desktop",
          title: "我的消息",
          name: "user_messages",
          children: []
        }
      ]
    },
  ]
}
*/
const selectedKeys = ref([])
const router = useRouter()
const route = useRoute()

function goto(item, parentItem) {
  if (parentItem !== undefined) {
    store.setCrumb([parentItem.title, item.title])
  } else {
    store.setCrumb([item.title])
  }

  store.addTab({
    name: item.name,
    title: item.title,
    parentTitle: parentItem?.title // 一级菜单的名称，如果未undefined，那么这个tab就是一级菜单
  })
  // 加入到 tabs
  router.push({
    name: item.name
  })
}


function loadRoute(name) {

  for (const menu of data.menuList) {
    if (menu.name === name) {
      selectedKeys.value = [menu.name]
      return
    }
    for (const subMenu of menu.children) {
      if (subMenu.name === name) {
        selectedKeys.value = [subMenu.name]
        // 找到id，展开对应的菜单
        data.openKeys = [menu.name]
        return
      }
    }
  }
}

onBeforeRouteUpdate((to, from, next) => {
  loadRoute(to.name)
  next()

})
loadRoute(route.name)

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