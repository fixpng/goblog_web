<template>
  <div class="gvb_user_info">
    <div class="avatar" v-if="props.isAvatar">
      <img src="https://inews.gtimg.com/newsapp_bt/0/9680744080/641" alt="">
    </div>
    <div class="drop_menu">
      <a-dropdown :placement="bottomRight">
        <a class="ant-dropdown-link" @click.prevent>
          倪半仙
          <i class="fa fa-angle-down"></i>
        </a>
        <template #overlay>
          <a-menu @click="menuClick">
            <a-menu-item key="user_center">
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item key="my_messages">
              <a href="javascript:;">我的消息</a>
            </a-menu-item>
            <a-menu-item key="article_list">
              <a href="javascript:;">文章列表</a>
            </a-menu-item>
            <a-menu-item key="logout">
              <a href="javascript:;">注销退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"

const router = useRouter()
const props = defineProps({
  // 是否显示头像部分
  isAvatar: {
    type: Boolean,
    default: false,
  }
})

function menuClick({key}) {
  if (key === "logout") {
    console.log("logout")
    return
  }
  router.push({
    name: key
  })
}
</script>

<style>
.gvb_user_info {
  display: flex;
  align-items: center;
}
</style>
