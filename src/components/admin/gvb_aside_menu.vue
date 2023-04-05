<template>
  <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="false"
  >
    <template v-for="menu in data.menuList" :key="menu.id">
      <a-menu-item key="menu.id" v-if="menu.children.length === 0">
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
        <a-menu-item v-for="sub_menu in menu.children" :key="sub_menu.id">
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
      id: 2,
      icon: "fa-user-circle-o", // icon的图片，统一用 fa
      title: "用户管理", // 菜单名称
      name: "", // 路由名称
      children: [{
        id: 3,
        icon: "fa-users", // icon的图片，统一用 fa
        title: "用户列表", // 菜单名称
        name: "user_list", // 路由名称
      }, {
        id: 4,
        icon: "fa-user-plus", // icon的图片，统一用 fa
        title: "添加用户", // 菜单名称
        name: "user_create", // 路由名称
      }
      ]
    },
    {
      id: 5,
      icon: "fa-cog", // icon的图片，统一用 fa
      title: "系统管理", // 菜单名称
      name: "", // 路由名称
      children: [{
        id: 6,
        icon: "fa-cog", // icon的图片，统一用 fa
        title: "系统配置", // 菜单名称
        name: "system_list", // 路由名称
      }
      ]
    }

  ]
})
const selectedKeys = ref(["1"])
</script>

<style>

</style>