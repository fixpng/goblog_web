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
        <router-view></router-view>
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

    header {
      height: 60px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
      border: 1px solid var(--order);
    }

    main {
      background-color: var(--bg);
      height: calc(100vh - 90px);
      padding: 20px;
      .gvb_view{
      }
    }
  }
}
</style>