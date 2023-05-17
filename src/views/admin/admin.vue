<template>
  <div class="gvb_admin">
    <GVBAside></GVBAside>
    <div class="main">
      <header>
        <div class="left">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item><a href="#">个人中心</a></a-breadcrumb-item>
            <a-breadcrumb-item>用户列表</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="right">
          <div class="icon_actions">
            <i class="fa fa-home"></i>
            <GVBTheme></GVBTheme>
            <GVBFullScreen></GVBFullScreen>
          </div>
          <GVBUserInfo :is-avatar="true"></GVBUserInfo>
        </div>
      </header>
      <div class="tabs"></div>
      <main>
        <div class="gvb_view">
          <router-view v-slot="{Component}">
            <transition name="fade" mode="out-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import GVBTheme from "@/components/gvb_theme.vue";
import GVBAside from "@/components/admin/gvb_aside.vue";
import GVBUserInfo from "@/components/gvb_user_info.vue";
import GVBFullScreen from "@/components/gvb_full_screen.vue";


</script>

<style lang="scss">
.gvb_admin {
  width: 100%;
  display: flex;


  .main {
    width: calc(100% - 240px);
    height: 100vh;
    overflow-y: auto;
    background-color: var(--bg);
    overflow-x: hidden;

    header {
      height: 60px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--card_bg);

      .right {
        display: flex;
        align-items: center;
      }

      .icon_actions {
        margin-right: 20px;

        i {
          margin-left: 10px;
          cursor: pointer;
          font-size: 16px;
          color: var(--text)
        }

        i:hover {
          color: var(--active);
        }
      }

      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .drop_menu {
        margin-left: 10px;
      }
    }

    .tabs {
      height: 30px;
      border-color: var(--order);
      border-style: solid;
      border-width: 1px 0 1px 0;
      background-color: var(--card_bg);
    }

    main {
      padding: 20px;

      .gvb_view {
      }
    }
  }
}
</style>

<!--组件过度-->
<style>
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.fade-leave-active, .fade-enter-active {
  transition: all 0.15s ease-out;
}
</style>