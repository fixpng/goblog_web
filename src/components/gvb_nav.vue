<template>
  <div class="gvb_nav show">
    <div class="gvb_nav_container">
      <div class="logo">
        <div>FIXPNG</div>
        <div>DeepDarkFantasy</div>
      </div>
      <div class="left">
        <span><a href="/" class="router-link-active">首页</a></span>
        <span><a href="/news" class="">新闻</a></span>
        <span><a href="/about" class="">关于</a></span>
        <span><a href="/search" class="">文章搜索</a></span>
        <span><a href="/chat" class="">聊天室</a></span>
        <span><a href="http://docs.fengfengzhidao.com/">官方文档</a></span>
        <span class="search"><i class="fa fa-search"></i></span>
      </div>
      <div class="right">
        <GVBTheme class="gvb_theme"></GVBTheme>
        <span class="login_bin" v-if="store.userInfo.role === 0 ">
          <a href="javascript:void (0)" @click="goLogin">登录</a>
        </span>
        <GVBUserInfo v-if="store.userInfo.role !== 0 "></GVBUserInfo>
      </div>
    </div>
  </div>
</template>

<script setup>
import GVBTheme from "@/components/gvb_theme.vue";
import GVBUserInfo from "@/components/gvb_user_info.vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {useStore} from "@/stores/store";

const store = useStore()
const router = useRouter()
const route = useRoute()

function goLogin() {
  router.push({
    name: "login",
    query: {
      redirect_url: route.path
    }
  })
  localStorage.setItem("redirect_url", route.path)
}
</script>

<style lang="scss">
.gvb_nav {
  position: fixed;
  top: 0;
  width: 100%;
  //background-color: transparent;
  height: 60px;
  //box-shadow: 1px 1px 5px #0003;
  display: flex;
  justify-content: center;
  font-size: 14px;
  z-index: 1000;
  color: white;

  .gvb_nav_container {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  .logo {
    width: 10%;
    transform: scale(0.7);
    color: var(--text);

    div:first-child {
      font-size: 26px;
    }

    div:last-child {
      font-size: 12px;
    }
  }

  .left {
    width: 50%;
    display: flex;

    span {
      margin-right: 30px;
    }

    .search i {
      cursor: pointer;
    }
  }

  a {
    color: white;

    &:hover {
      color: var(--active);
    }
  }

  .right {
    width: 40%;
    display: flex;
    justify-content: right;
    align-items: center;

    .login_bin {
      margin-right: 20px;

    }

    .gvb_theme {
      margin-right: 20px;
      color: var(--text);
    }
  }
}

.gvb_nav.show {
  background-color: var(--card_bg);
  box-shadow: 1px 1px 5px #0003;
  color: #2b3539;

  a {
    color: var(--text);

    &:hover {
      color: var(--text);
    }
  }
}

</style>