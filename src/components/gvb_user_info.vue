<template>
  <div class="gvb_user_info">
    <a href="javascript:void (0)" @click="goLogin">登录</a>
    <div class="avatar" v-if="props.isAvatar">
      <img :src="store.userInfo.avatar" alt="">
    </div>
    <div class="drop_menu">
      <a-dropdown placement="bottomRight">
        <a class="ant-dropdown-link" @click.prevent>
          {{ store.userInfo.nick_name }}
          <i class="fa fa-angle-down"></i>
        </a>
        <template #overlay>
          <a-menu>
            <template v-for="(item,index) in data.menu_list" :key="index">
              <a-menu-item v-if="item.title !== 'line'" @click="goto(item)">
                <a href="javascript:void (0)">{{ item.title }}</a>
              </a-menu-item>
              <a-menu-divider v-else/>
            </template>
            <a-menu-divider/>
            <a-menu-item @click="logout">
              <a href="javascript:;">注销退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router"
import {logoutApi} from "@/api/user_api";
import {message} from "ant-design-vue";
import {useStore} from "@/stores/store";
import {reactive} from "vue";

const router = useRouter()
const route = useRoute()
const store = useStore()
const props = defineProps({
  // 是否显示头像部分
  isAvatar: {
    type: Boolean,
    default: false,
  }
})

const data = reactive({
  menu_list: [
    {
      title: "我的信息",
      name: "user_info",
      parentTitle: "个人中心",
    },
    {
      title: "我的收藏",
      name: "user_collects",
      parentTitle: "个人中心",
    },
    {
      title: "我的消息",
      name: "user_messages",
      parentTitle: "个人中心",
    },
  ]
})

if (store.userInfo.role === 1 || store.userInfo.role === 3) {
  data.menu_list.push({
    title: "line",
  })
  data.menu_list.push({
    title: "添加文章",
    name: "add_article",
    parentTitle: "文图管理",
  })
  data.menu_list.push({
    title: "文章管理",
    name: "article_list",
    parentTitle: "文图管理",
  })
  data.menu_list.push({
    title: "用户列表",
    name: "user_list",
    parentTitle: "用户管理",
  })
  data.menu_list.push({
    title: "系统日志",
    name: "log_list",
    parentTitle: "系统管理",
  })
}

function goLogin() {
  router.push({
    name: "login",
    query: {
      redirect_url: route.path
    }
  })
  localStorage.setItem("redirect_url", route.path)
}


function goto(item) {
  store.setCrumb([item.parentTitle, item.title])
  store.addTab({
    name: item.name,
    title: item.title,
    parentTitle: item.parentTitle // 一级菜单的名称，如果为undefined，那么这个tab就是一级菜单
  })
  router.push({
    name: item.name
  })
}

async function logout() {
  let res = await logoutApi()
  if (res.code) {
    message.error(res.msg)
  } else {
    message.success(res.msg)
  }
  await router.push({name: 'login'})
  return
}


</script>

<style>
.gvb_user_info {
  display: flex;
  align-items: center;
}
</style>
