<template>
  <div class="gvb_settings_bg">
    <div class="gvb_sub_menu">
      <a :class="{active: active==='system_site'}" href="javascript:void (0)" @click="goto('system_site', '网站设置')">网站设置</a>
      <a :class="{active: active==='system_email'}" href="javascript:void (0)" @click="goto('system_email', '邮箱设置')">邮箱设置</a>
      <a :class="{active: active==='system_qiniu'}" href="javascript:void (0)" @click="goto('system_qiniu', '七牛云设置')">七牛云设置</a>
      <a :class="{active: active==='system_qq'}" href="javascript:void (0)" @click="goto('system_qq', 'qq设置')">qq设置</a>
      <a :class="{active: active==='system_jwt'}" href="javascript:void (0)" @click="goto('system_jwt', 'jwt设置')">jwt设置</a>
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