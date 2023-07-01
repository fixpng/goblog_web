<template>
  <div class="gvb_settings_bg">
    <div class="gvb_sub_menu">
      <a :class="{active: active==='system_site'}" href="javascript:void (0)" @click="goto('system_site', '网站配置')">网站配置</a>
      <a :class="{active: active==='system_email'}" disabled="isShow"  href="javascript:void (0)" @click="goto('system_email', '邮箱配置')">邮箱配置</a>
      <a :class="{active: active==='system_qiniu'}"  disabled="isShow"  href="javascript:void (0)" @click="goto('system_qiniu', '七牛云配置')">七牛云配置</a>
      <a :class="{active: active==='system_qq'}" disabled="isShow"  href="javascript:void (0)" @click="goto('system_qq', 'qq配置')">qq配置</a>
      <a :class="{active: active==='system_jwt'}"  disabled="isShow"   href="javascript:void (0)" @click="goto('system_jwt', 'jwt配置')">jwt配置</a>
    </div>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <!--    <router-view/>-->
  </div>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";
import {useStore} from "@/stores/store";
import {ref} from "vue";

const router = useRouter()
const route = useRoute()
const store = useStore()
const active = ref(route.name)
const isShow = ref(store.userInfo.role === 1)

function goto(routerName, title) {
  router.push({
    name: routerName
  })
  store.addTab({
    name: routerName,
    title: title,
  })
  active.value = routerName
}


</script>


<style lang="scss">
.gvb_settings_bg {
  background-color: var(--card_bg);
  min-height: calc(100vh - 130px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gvb_sub_menu {
    width: 1000px;
    margin-top: 20px;

    a {
      color: var(--text);
      margin-right: 20px;
    }
    a.active{
      color: var(--active);
    }
  }
}
</style>